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
            intent.cleanQuery = q.replace(/(sasta|cheap|low price)/g, '').trim();
        } else if (q.includes('premium') || q.includes('expensive')) {
            intent.sort = 'priceDesc';
        }

        if (q.includes('best') || q.includes('top') || q.includes('latest')) {
            intent.sort = 'ratingDesc';
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

        let results = fuse.search(intent.cleanQuery).map(res => ({
            ...res.item,
            score: res.score
        }));

        if (results.length === 0) return [];

        if (intent.sort === 'priceAsc') {
            results.sort((a, b) => a.price - b.price);
        } else if (intent.sort === 'priceDesc') {
            results.sort((a, b) => b.price - a.price);
        } else if (intent.sort === 'ratingDesc') {
            results.sort((a, b) => b.rating - a.rating);
        } else {
            results.sort((a, b) => {
                const scoreA = (1 - a.score) * 100;
                const scoreB = (1 - b.score) * 100;

                const ratingA = (a.rating || 0) * 10;
                const ratingB = (b.rating || 0) * 10;

                const totalA = (scoreA * 0.7) + (ratingA * 0.3);
                const totalB = (scoreB * 0.7) + (ratingB * 0.3);

                return totalB - totalA;
            });
        }

        return results;
    }
}

module.exports = new SearchEngine();
