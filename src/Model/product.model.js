const productModel = {
    products: [],
    productsMap: new Map(),

    add(product) {
        if (this.productsMap.has(product.productId)) {
            throw new Error(`Product with ID ${product.productId} already exists.`)
        }
        this.products.push(product)
        this.productsMap.set(product.productId, product)
        return product
    },

    update(productId, updates) {
        const product = this.productsMap.get(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        const { Metadata, ...rootUpdates } = updates;

        delete rootUpdates.productId;
        Object.assign(product, rootUpdates);

        if (Metadata) {
            product.Metadata = { ...product.Metadata, ...Metadata };
        }

        return product;
    },

    find(query = {}) {
        if (Object.keys(query).length === 0) return this.products
        return this.products.filter(p => {
            for (let key in query) {
                if (p[key] !== query[key]) return false
            }
            return true
        })
    },

    findOne(query = {}) {
        const results = this.find(query)
        return results.length > 0 ? results[0] : null
    },
    bulkAdd(items) {
        items.forEach(p => this.add(p))
    }
}

module.exports = {
    productModel
}