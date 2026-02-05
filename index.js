const { scrapeProducts } = require('./src/utils/scrapper');
const { productModel } = require('./src/Model/product.model');
const { productRouter } = require('./src/routes/routes.js');

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
require("dotenv").config()
app.use(express.json())
app.use('/api', productRouter);
app.get('/', (req, res) => {
    res.send({ "msg": "This is the home page for testing the server" })
})
async function initData() {
    console.log("Starting Scraper...");
    try {
        const data = await scrapeProducts();
        productModel.bulkAdd(data);
        console.log(`Database seeded with ${data.length} products`);
    } catch (err) {
        console.error("Seeding failed:", err);
    }
}

app.listen(4500, async () => {
    console.log("Server running on port 4500");
    await initData();
});