const Fuse = require('fuse.js');

class SearchEngine {
    constructor() {
        this.weights = {
            textMatch: 0.6,
            rating: 0.2,
            popularity: 0.1,
            priceOp: 0.1
        };
    }

    analyzeIntent(query) {
        const q = query.toLowerCase();
        const intent = {
            sort: null,
            filters: {},
            cleanQuery: query
        };

        if (q.includes('sasta') || q.includes('cheap') || q.includes('under') || q.includes('low price')) {
            intent.sort = 'priceAsc';
            intent.cleanQuery = q.replace(/(sasta|cheap|low price|under)/g, '').trim();
        } else if (q.includes('premium') || q.includes('expensive')) {
            intent.sort = 'priceDesc';
        }

        if (q.includes('latest') || q.includes('new') || q.includes('recent')) {
            intent.sort = 'dateDesc';
            intent.cleanQuery = q.replace(/(latest|new|recent)/g, '').trim();
        }

        if (q.includes('best') || q.includes('top') || q.includes('popular') || q.includes('trending')) {
            intent.sort = 'popularityDesc';
            intent.cleanQuery = q.replace(/(best|top|popular|trending)/g, '').trim();
        }

        return intent;
    }

    search(products, rawQuery) {
        if (!rawQuery) return products;

        const intent = this.analyzeIntent(rawQuery);

        const fuse = new Fuse(products, {
            keys: ['title', 'description', 'Metadata.model'],
            includeScore: true,
            threshold: 0.4,
            ignoreLocation: true
        });

        let results = [];
        if (!intent.cleanQuery) {
            results = products.map(p => ({ ...p, score: 0 }));
        } else {
            results = fuse.search(intent.cleanQuery).map(res => ({
                ...res.item,
                score: res.score
            }));
        }

        if (results.length === 0) return [];

        if (intent.sort === 'priceAsc') {
            results.sort((a, b) => a.price - b.price);
        } else if (intent.sort === 'priceDesc') {
            results.sort((a, b) => b.price - a.price);
        } else if (intent.sort === 'dateDesc') {
            results.sort((a, b) => new Date(b.releaseDate || 0) - new Date(a.releaseDate || 0));
        } else if (intent.sort === 'popularityDesc') {
            results.sort((a, b) => {
                const popularityA = (a.salesCount || 0) * 0.7 + (a.rating || 0) * 1000;
                const popularityB = (b.salesCount || 0) * 0.7 + (b.rating || 0) * 1000;
                return popularityB - popularityA;
            });
        } else {
            results.sort((a, b) => {
                const scoreA = (1 - a.score) * 100;
                const scoreB = (1 - b.score) * 100;
                const boostA = Math.log(a.salesCount || 1);
                const boostB = Math.log(b.salesCount || 1);

                return (scoreB + boostB) - (scoreA + boostA);
            });
        }

        return results;
    }
}

module.exports = new SearchEngine();
