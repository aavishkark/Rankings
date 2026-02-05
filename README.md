# Vista

Vista is an e-commerce search engine microservice I built to understand how intelligent product ranking works under the hood. instead of just matching keywords, I wanted to create a system that actually understands what a user is looking for whether it's the "latest" tech or a "budget" deal.

It scrapes real-time data, processes it, and serves it up through a custom ranking algorithm that adjusts based on user intent.

## Tech Stack

**Back-End:**
<p>
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs" />
    <img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white" alt="puppeteer" />
    <img src="https://img.shields.io/badge/Fuse.js-000000?style=for-the-badge&logo=javascript&logoColor=white" alt="fusejs" />
</p>

## What It Does

### It Understands Context
Most simple search engines fail when you type things like "Latest Samsung phone" because they look for a phone literally named "Latest".
Vista is smarter. It detects these "intent keywords" and changes how it sorts the results:
- **"Latest" / "New"**: Automatically prioritizes new releases.
- **"Best" / "Top"**: Pushes popular, high-selling items to the top.
- **"Cheap" / "Budget"**: Sorts by price (low to high).

### Real-Time Data Scraping
I didn't want to work with static JSON files, so I integrated **Puppeteer**. When the server starts, it actually goes out to e-commerce test sites, scrapes live headings, prices, and ratings, and seeds the database.

### Performance
To keep things snappy, I'm using an in-memory Map structure for `O(1)` lookups. This means updating a product happens instantly, even if the dataset grows.

## API Endpoints

Here are the main endpoints if you want to test it out:

**Search**
```http
GET /api/search?query=Best+Samsung
```
*Try queries like "Cheap laptop", "Latest phone", or just "Samsung".*

**Get All Products**
```http
GET /api/all
```

**Update Product**
```http
PUT /api/update/:id
```
*Supports updating deeply nested metadata without overwriting the whole object.*

## Running Locally

If you want to play around with the code:

1.  **Clone the repo**
    ```bash
    git clone https://github.com/aavishkark/vista.git
    cd vista
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run it**
    ```bash
    npm start
    ```
    *The scraper might take a few seconds to initialize on the first run.*

## Contributor
- [Avishkar kamble](https://github.com/aavishkark)
