const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function scrapeProducts(baseUrl = 'https://webscraper.io/test-sites/e-commerce/allinone', targetCount = 1000) {
    console.log(`Starting scrape of ${baseUrl} targetting ${targetCount} products...`);
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const allProducts = [];
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    try {
        const categories = [
            '/computers/laptops',
            '/phones/touch'
        ];

        for (const cat of categories) {
            const url = `${baseUrl}${cat}`;
            console.log(`Navigating to ${url}`);
            await page.goto(url, { waitUntil: 'domcontentloaded' });

            const content = await page.content();
            const $ = cheerio.load(content);

            $('.thumbnail').each((i, el) => {
                const title = $(el).find('.title').attr('title') || $(el).find('.title').text().trim();
                const priceText = $(el).find('.price').text(); // e.g., $110.00
                const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
                const description = $(el).find('.description').text().trim();
                const rating = parseInt($(el).find('.ratings p[data-rating]').attr('data-rating')) || 0;
                const reviewCount = parseInt($(el).find('.ratings .pull-right').text()) || 0;

                allProducts.push({
                    title,
                    price: Math.floor(price * 85),
                    currency: 'INR',
                    description,
                    rating,
                    reviewCount,
                    stock: Math.floor(Math.random() * 100),
                    category: cat.includes('phones') ? 'Mobile' : 'Laptop',
                    source: 'webscraper.io'
                });
            });
        }

        console.log(`Scraped ${allProducts.length} base products.`);

        const variants = ['64GB', '128GB', '256GB', '512GB'];
        const colors = ['Black', 'White', 'Blue', 'Red', 'Gold'];

        const finalProducts = [...allProducts];
        let idCounter = 1;

        finalProducts.forEach(p => p.productId = idCounter++);

        while (finalProducts.length < targetCount) {
            const base = allProducts[Math.floor(Math.random() * allProducts.length)];

            const variantStorage = variants[Math.floor(Math.random() * variants.length)];
            const variantColor = colors[Math.floor(Math.random() * colors.length)];

            const newPrice = base.price + (variants.indexOf(variantStorage) * 5000); // Add cost for storage

            finalProducts.push({
                ...base,
                productId: idCounter++,
                title: `${base.title} ${variantStorage} ${variantColor}`,
                price: newPrice,
                stock: Math.floor(Math.random() * 50),
                isVariant: true
            });
        }

        console.log(`Total products generated: ${finalProducts.length}`);
        await browser.close();
        return finalProducts;

    } catch (error) {
        console.error("Scraping failed:", error);
        await browser.close();
        return [];
    }
}

module.exports = { scrapeProducts };