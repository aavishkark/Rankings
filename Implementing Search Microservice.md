# Chat Conversation

Note: _This is purely the output of the chat conversation and does not contain any raw data, codebase snippets, etc. used to generate the output._

### User Input

Make a implementation plan for the below assignment , the plan should be detailed but easy to implement for me in less than 2 hours also it should guide me to develope the microservice mentiond in the assignment, go through it in depth and give me the plan

Search engine for an e-commerce platform

Imagine you are building an e-commerce platform for electronics targeting Tier-2 and Tier-3 cities
in India. Electronics include mobile phones, phone accessories, laptops, headphones, and other
electronic gadgets that you can think of.
Since the catalog of products can be vast (millions of products), the ability to search for a product
lies at the heart of the platform.
As part of this exercise, we would focus on building the search engine, specifically focusing on
the ranking of the products for a given query.
Example
Customer types “iPhone” - there might be phones of different models from iPhone 5 to iPhone
16, in different colors, with different RAM/storage configurations, and also iPhone chargers or
iPhone screen guards, iPhone covers, and more, which can span across 1000s of matching
results.
How do we define the algorithms to rank these products to make them relevant for the user?
1. for example: Ratings(Out of 5), Number of units Sold, Stock availability, Price, etc. For
example, when searching Samsung phone, whatever products have better Ratings or
Price etc should come on top of the list
Sample customer queries
- Latest iphone
- Sastha wala iPhone (Hinglish intent)
- Ifone 16 (spelling mistake)
- iPhone 16 red color
- iPhone 16 more storage

- iPhone cover strong
- iPhone 50k rupees

What do we build

Setup
- Please scrape the data from the web to bootstrap your products and catalog. (at least
1000+)
- Assume/ feel free to generate any data points you would require for a product, such as
sales, return rate, ratings/reviews, number of customer complaints, pricing, and any other
factors that can impact the ranking algorithm, and you believe would be important for the
customer.

Application

Create a microservice with the following responsibilities.
1. You should be able to store products and their attributes extracted in the previous step
in-memory. (with the relevant entity-design)
2. You should be able to add relevant metadata in the products, such as description, screen
size, memory, display type, sound output, brightness, etc
3. Implement an API that receives the search query the customer typed on the application
and returns relevant products in the result.
a. As part of this API, you should be able to rank the products in search results
based on various attributes of the products. Please be as creative as possible on
ranking/sorting algorithms, and feel free to use any existing libraries/ algorithms.

Good to have
1. Enrich the data to add more attributes that might be relevant for the product using any
LLMs
2. If you are able to persist the catalog in a datastore and run the search queries in the
datastore, that would be great.

You need to implement the following APIs to support the above functionality:

1. Store Product in Catalog
Description: Given a product, you should be able to store it in the data store
Endpoint:
POST /api/v1/product
Sample Request:
POST /api/v1/product
Body
{
“title” : “Iphone 17”,
“description” : “6.3-inch 120Hz ProMotion OLED display with 3,000 nits peak brightness,
powered by the A19 chip. It includes a new 18MP front camera with Center Stage, 48MP dual rear
cameras, 8GB of RAM, and a 3692mAh battery“,
“rating” : 4.2,
“stock” : 1000,
“price”: 81999,
“mrp” : 82999,
“currency” : “Rupee”
}

Sample Response:
{
"productId": 101
}

2. Update Metadata for the Product

Description: Given the warehouse ID and customer ID, return the shipping charge based on the
distance and transport mode.
Endpoint:
PUT /api/v1/product/meta-data
Sample Request:
PUT /api/v1/product/meta-data
Body
{
“productId” : 101,
“Metadata” : {

“ram” : “8GB”,
“screensize” : “6.3 inches”,
“model” : “Iphone 17”
“storage”: “128GB”,
“brightness”: “300nits”
}
}

Sample Response:
{
“productId” : 101,
“Metadata” : {

“ram” : “8GB”,
“screensize” : “6.3 inches”,
“model” : “Iphone 17”
“storage”: “128GB”,
“brightness”: “300nits”
}
}

3. Search the Products
Description: Given an input user type and search query, return the ranked product list
Endpoint:
GET /api/v1/search/product?query=”Sasta Iphone”
Sample Request:

{}

Sample Response:
{
“data”: [
{
“productId”: 80,
“title”: “Iphone 13”
“description” : “This is an iphone 13 64GB white colour”,
“mrp” : 62999,
“Sellingprice”: 35000,
“Metadata”: {...},
“stock” : 10
},
{
“productId”: 102,
“title”: “Iphone 17”
“description” : “This is an iphone 17 256gb blue colour”,
“mrp” : 79999,
“Sellingprice”: 60000,
“Metadata”: {...},
“stock” : 100
},
{
“productId”: 101,
“title”: “Iphone 16”
“description” : “This is an iphone 16 128gb black colour”,
“mrp” : 77999,
“Sellingprice”: 59000,
“Metadata”: {...},
“stock” : 10
},
{
“productId”: 105,
“title”: “Iphone 17 pro Mobile cover blue”
“description” : “This is an mobile cover for iphone 17 pro”,
“mrp” : 1999,
“Sellingprice”: 1000,
“Metadata”: {...},
“stock” : 100
},
{
“productId”: 103,
“title”: “Iphone 17 pro”

“description” : “This is an iphone 17 pro 256gb black colour”,
“mrp” : 134999,
“Sellingprice”: 131999,
“Metadata”: {...},
“stock” : 0
}
]
}

Guidelines
All the APIs mentioned in the document are prescriptive; do not limit yourself to these APIs, and
please feel free to add any other APIs that you deem useful. Be creative in identifying more by
taking inspiration from e-commerce applications and keeping yourself in the shoes of the user
who is ordering products on this app.
Must have
1. Ensure the APIs handle exceptions gracefully
2. Write clean, modular, and well-documented code. Include comments where necessary.
3. Try to research as much as possible and come up with your algorithm based on standard
approaches.
4. APIs should have less than 1000 ms latency.

Time duration: 90 minutes

Deliverables
- We expect a GitHub repo that must contain
- Frequent commits with good engineering standards help us to understand your
progress better.
- ReadMe file on how to run your service and any other details you would like to
share.
- A file containing a copy of your conversations with any of the LLMs on your IDE or
on ChatGpt/Gemini, etc., for us to understand your code better. Do not worry, we
do not judge you on silly questions or silly mistakes.

Frequently asked questions
- Can I use the internet?
- Yes completely. You are free to use the internet, explore GitHub repositories,
existing implementations, and research papers.
- Focus is on your ability to apply the knowledge rather than to test your
knowledge.

- Can I use Cursor/AntiGravity/Copilot/Claude code?
- Absolutely and must.
- Focus is on our ability to iterate fast by using this tooling as an enabler.
- At the same time, we would expect a deeper understanding of the code
generated by the tools.

- I am not able to scrape the data. Can I generate synthetic data and proceed?
- Not ideal, but if you are stuck at this step, I would still go ahead with the creation
of the microservice and ranking algorithms.
- Should I use any specific language or framework?
- You are absolutely free to use any language of your choice and any framework or
data store of your choice.
- We are language agnostic, and any technology choices are welcome.
- How would my submission be evaluated?
- Creation of a microservice and the ability to write APIs are the bare minimum
expectations.
- Creative solutions on the Scraping and Ranking algorithms, and a
customer-centric approach in building the algorithms.



*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### User Input

i have created a in memory database model for the products can you review it

*Listed directory [vista](file:///c:/Users/2025/Desktop/Code/vista) *

*Viewed [package.json](file:///c:/Users/2025/Desktop/Code/vista/package.json) *

*Edited relevant file*

### User Input

no i want you to guide me scrape 1000+ data from a website what is the best and most efficient way to do that

*User accepted the command `npm install puppeteer cheerio`*

*Edited relevant file*

*Edited relevant file*

### User Input

give me a step by step guide i will implement it myself

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*User accepted the command `npm install puppeteer cheerio`*

### User Input

which website is ideal for fast data scrapping ?

### Planner Response

For this assignment (where you have a 2-hour limit), **speed and reliability** are more important than "real-time" accuracy.

I strongly recommend **[WebScraper.io Test Sites](https://webscraper.io/test-sites/e-commerce/allinone)**.

### Why?
1.  **Zero Anti-Bot**: It is *designed* to be scraped. You won't get IP banned or CAPTCHA blocks.
2.  **Structured Data**: HTML is clean, making selectors easy to find.
3.  **Relevant Categories**: It has `Computers > Laptops` and `Phones > Touch` sections perfect for your "Electronics" requirement.
4.  **Pagination Exists**: Good for demonstrating your scraper can handle multiple pages.

**Option 2 (Real Data, Medium Difficulty)**: **[Smartprix.com](https://www.smartprix.com/mobiles)**.
- Good for "Indian Tier-2/3" context (shows prices in Rupees).
- Relatively static HTML compared to Amazon/Flipkart.
- **Risk**: Might get rate-limited if you hit it too fast.

**Recommendation**: Use **WebScraper.io** to build the *pipeline* and *ranking logic* first. If you have time left, point the scraper to Smartprix.

Shall we proceed with **WebScraper.io** URLs for the implementation?

### User Input

i will scrape WebScraper.io, does our current scrapper has currect extraction logic for WebScraper.io

*Viewed [scrapper.js](file:///c:/Users/2025/Desktop/Code/vista/src/utils/scrapper.js) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### User Input

im doing the seeding the data in index.js please review it

*Viewed [index.js](file:///c:/Users/2025/Desktop/Code/vista/index.js) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### User Input

i have implemented the route file for add search update products please review it

*Viewed [index.js](file:///c:/Users/2025/Desktop/Code/vista/index.js) *

*Viewed [routes.js](file:///c:/Users/2025/Desktop/Code/vista/src/routes/routes.js) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### User Input

make a doc detailing how ranking.js works

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

### User Input

i have added the ranking service and using router in index,js please review it

*Listed directory [vista](file:///c:/Users/2025/Desktop/Code/vista) *

*Listed directory [src](file:///c:/Users/2025/Desktop/Code/vista/src) *

*Viewed [routes.js](file:///c:/Users/2025/Desktop/Code/vista/src/routes/routes.js) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*User accepted the command `npm install fuse.js`*

### User Input

create a file for me with jsos body and api url to test all endpoints

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*

*User accepted the command `git add .`*

*User accepted the command `git commit -m "Fix product update logic to handle root vs metadata fields correctly"`*

*User accepted the command `git push`*

### User Input

help me improve the rankings logic to convert query words such as latest to look for recent released , best and top to look for popular bought a lot of times and rating favorite

*Viewed [ranking.js](file:///c:/Users/2025/Desktop/Code/vista/src/services/ranking.js) *

*Viewed [scrapper.js](file:///c:/Users/2025/Desktop/Code/vista/src/utils/scrapper.js) *

*Edited relevant file*

*Edited relevant file*

*Edited relevant file*