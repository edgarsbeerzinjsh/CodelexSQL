import { resolve } from "path";
import { ShopifyCsvLoader } from "../../src/data/shopify-csv-loader";

describe("shopify csv loader", () => {
    it("should load apps", async done => {
        const filePath = resolve(__dirname, "./apps-short.csv");
        const apps = await ShopifyCsvLoader.loadApps(filePath);
        expect(apps).toEqual([
            {
                shopifyAppId: 1,
                url: "https://apps.shopify.com/powr-hit-counter",
                title: "Hit Counter",
                tagline: "Boost sales using social proof with a simple hit counter!",
                developer: "POWr.io",
                developerLink: "https://apps.shopify.com/partners/powr-io",
                icon: "https://apps.shopifycdn.com/listing_images/16e05429c0eef4be5a766c9e045eb606/icon/3e308ef3d9381a41b01025372c1bd04a.png?height=84&width=84",
                rating: 4.4,
                reviewsCount: 39,
                description: `Show off your site traffic using Hit Counter for social proof that will help increase conversions! Use it for analytics, to keep track of your store visits.     Record and display your website?��s traffic, number of visitors, shoppers and product page views.   Highly customizable design: pick custom colors and fonts, adjust size, add borders, and more.   Supports text in any language.   Mobile responsive on any device.   Instant access to all 50 POWr plugins.     Upgrade to remove POWr branding and unlock advanced features, such as:     Count only unique page views.   Custom CSS and JavaScript.   Unlock premium features in other POWr apps, such as Social Feed for fresh content on your site and Popup for stellar landing page conversion. See all apps here: https://apps.shopify.com/partners/powr-io     Getting Started with POWr:   POWr is easy to install. Click on the green ?��GET?�� button on this page to install the app. Create your Hit Counter, and add it to any page of your Shopify site.`,
                pricingHint: ""
            },
            {
                shopifyAppId: 2,
                url: "https://apps.shopify.com/uncomplicated-categories",
                title: "Categories Uncomplicated",
                tagline: "Categories for Shopify, done the right way",
                developer: "Lightenna Ltd",
                developerLink: "https://apps.shopify.com/partners/lightenna",
                icon: "https://apps.shopifycdn.com/listing_images/906922babc9d2578a543dfcd19e97524/icon/e70dc3740f30b2b6c62bf053c5c4196f.png?height=84&width=84",
                rating: 5.0,
                reviewsCount: 34,
                description: `Simple categories for Shopify collections   One of the first things shop-owners new to Shopify tell us is that they can't believe there isn't a category system. Now with Categories Uncomplicated you can organise your collections into a structure that at a glance helps your customers understand: * What kinds of products you sell * How those products are organised * How they can narrow their search down to more specific sub-categories and find the group of products they're shopping for   3-in-1 bundle of products   Categories Uncomplicated includes: * Category list: a category list for your left-hand sidebar * Breadcrumbs: a full breadcrumb to show on collections or product pages * Icons: sub-category icons to show in each parent collection    Our Demo site shows all the features of Categories Uncomplicated in a live shop environment.  There's also a combined product tour that covers all the bundled products: https://uncomplicated.myshopify.com/collections/technology-computers#tour-catlist-start   Suitability   The category list needs to be embedded somewhere on your site, which requires a basic HTML/CSS coding knowledge. We strongly recommend choosing a theme with a sidebar, selecting the place for your category list, then cut-and-pasting the embed.    We regret we cannot offer a service to embed this for you in your store or customise your theme to make the category list look different. If it turns out that your theme is lacking or you're not comfortable editing themes, you might like to take a look at our sister apps that require no coding whatsoever:      Menus Uncomplicated, which shows the same category list in the menu navigation and   Floating Category List, which floats over the left-hand side of the page (without a sidebar)     Visitors and Search   Categories Uncomplicated isn't just about helping existing visitors become more valuable customers, it enables you to better present your products to search engines:   Create categories and sub-categories   with unique hierarchical URLs that allow search engines to index groups of your products in context.   Specialise each category (a collection)   with custom header text that explains what it's about.  Show product counts against each of your categories so customers can quickly see where your catalogue is fullest.   Use the existing Shopify 'Navigation' system   to create links, then visualise them in the embedded Categories admin panel.  Simply select the top-level category from the menu selector to see a category tree instantaneously.   Improve the SEO metadata   that you're sending to Google by including dynamically generated JSON-LD to describe the current category   Create great intuitive navigation   by embedding our pre-built page elements in your navigation.`,
                pricingHint: "10-day free trial"
            }
        ]);
        done();
    });

    it("should load categories", async done => {
        const filePath = resolve(__dirname, "./categories.csv");
        const categories = await ShopifyCsvLoader.loadCategories(filePath);
        expect(categories).toEqual([
            { title: "Store design" },
            { title: "Sales and conversion optimization" },
            { title: "Marketing" },
            { title: "Productivity" },
            { title: "Customer support" },
            { title: "Orders and shipping" },
            { title: "Trust and security" },
            { title: "Finding and adding products" },
            { title: "Inventory management" },
            { title: "Reporting" },
            { title: "Finances" },
            { title: "Places to sell" }
        ]);
        done();
    });

    it("should load key_benefits", async done => {
        const filePath = resolve(__dirname, "./key_benefits-short.csv");
        const keyBenefits = (await ShopifyCsvLoader.loadKeyBenefits(filePath))[0];
        expect(keyBenefits).toEqual(
            {
                shopifyAppId: 1,
                title: 'Social Proof to Drive Sales',
                description: 'Boost sales by using hit counter to show customers how popular your store is!'
            }
        );
        done();
    });

    it("should load unique pricing_plans", async done => {
        const filePath = resolve(__dirname, "./pricing_plans-short.csv");
        const uniquePricies = await ShopifyCsvLoader.loadUniquePricingPlans(filePath);
        expect(uniquePricies).toEqual([
            "Free",
            "$4.99/month",
            "$11.99/month",
            "$49.99/month",
            "$10/month"
        ]);
        done();
    });

    it("should load pricing_plans", async done => {
        const filePath = resolve(__dirname, "./pricing_plans-short.csv");
        const price = (await ShopifyCsvLoader.loadPricingPlans(filePath))[0];
        expect(price).toEqual(
            { shopifyAppId: 1, price: "Free" }
        );
        done();
    });

    it("should load reviews", async done => {
        const filePath = resolve(__dirname, "./reviews-short.csv");
        const reviews = await ShopifyCsvLoader.loadReviews(filePath);
        expect(reviews).toEqual([
            {
                shopifyAppId: 2,
                author: "Discount Office",
                body: "The only app I could get to work the way I wanted. Works amazingly well. Only gripe is because I have a large category tree (and I mean really big), I have to do a manual workaround but most sites won't have that issue. Highly recommended++++",
                rating: 4,
                helpfulCount: 0,
                dateCreated: "18.10.2018",
                developerReply: "",
                developerReplyDate: ""
            },
            {
                shopifyAppId: 2,
                author: "Vintro",
                body: "This app is amazing - it makes having sub categories so much easier to do, and it has great tutorials. This is a must have for anyone that wants to have sub categories. It is also has a great sidebar function which makes it easy to create and manage a sidebar.",
                rating: 5,
                helpfulCount: 0,
                dateCreated: "05.10.2018",
                developerReply: "",
                developerReplyDate: ""
            }
        ]);
        done();
    });

    it("should load app categories", async done => {
        const filePath = resolve(__dirname, "./apps_categories-short.csv");
        const appCategories = await ShopifyCsvLoader.loadAppCategories(filePath);
        expect(appCategories).toEqual([
            { shopifyAppId: 1,categoryId: 1 },
            { shopifyAppId: 1,categoryId: 2 },
            { shopifyAppId: 2,categoryId: 1 },
            { shopifyAppId: 3,categoryId: 3 }
        ]);
        done();
    });
})