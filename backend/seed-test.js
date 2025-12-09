const axios = require('axios');

async function seed() {
    const product = {
        title: "OG Black",
        slug: "og-black",
        type: "Skin",
        description: "The classic matte black skin for your console.",
        images: ["https://example.com/og-black-main.jpg"],
        tags: ["Best Seller", "Minimalist"],
        variants: [
            {
                deviceBrand: "Pioneer DJ",
                deviceModel: "DDJ-400",
                price: 1200,
                isInStock: true
            },
            {
                deviceBrand: "Pioneer DJ",
                deviceModel: "DDJ-FLX4",
                price: 1200,
                isInStock: true
            },
            {
                deviceBrand: "Denon DJ",
                deviceModel: "Prime 4",
                price: 1500,
                isInStock: true
            }
        ],
        isListed: true
    };

    try {
        console.log("Creating product...");
        const res = await axios.post('http://localhost:3002/products', product);
        console.log("Product Created:", res.data.title);

        console.log("Testing Filter (Pioneer DJ DDJ-400)...");
        const filterRes = await axios.get('http://localhost:3002/products?brand=Pioneer DJ&model=DDJ-400');
        console.log("Found products:", filterRes.data.length);
        console.log("First match:", filterRes.data[0].title);

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
}

seed();
