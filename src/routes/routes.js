const express = require('express')
const productRouter = express.Router()
const { productModel } = require('../Model/product.model')
const searchEngine = require('../services/ranking');

productRouter.post('/add', async (req, res) => {
    try {
        const product = req.body
        if (!product.title || !product.price) {
            res.status(400).send({ "error": "Title and Price are required" })
            return
        }
        if (!product.productId) {
            product.productId = Date.now()
        }

        const saved = productModel.add(product)
        res.status(200).send({ "msg": "A new product has been added", "productId": saved.productId })
    }
    catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

productRouter.get('/search', async (req, res) => {
    const query = req.query.query
    try {
        if (!query) {
            res.status(400).send({ "error": "Query parameter required" })
            return
        }

        const allProducts = productModel.find({});
        const results = searchEngine.search(allProducts, query);

        res.status(200).send({
            "count": results.length,
            "data": results.slice(0, 20)
        })
    }
    catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

productRouter.put('/update/:id', async (req, res) => {
    const pid = req.params.id
    try {
        const updated = productModel.updateMetadata(pid, req.body)
        res.status(200).send({ "msg": `Product with ID: ${pid} has been updated`, "product": updated })
    }
    catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

productRouter.get('/all', async (req, res) => {
    try {
        const products = productModel.find({})
        res.status(200).send({ "products": products })
    }
    catch (err) {
        res.status(400).send({ "error": err })
    }
})

module.exports = {
    productRouter
}
