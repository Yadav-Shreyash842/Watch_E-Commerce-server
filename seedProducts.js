require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

// Watch brands
const brands = ['Rolex', 'Omega', 'Seiko', 'Casio', 'Citizen', 'Tag Heuer', 'Breitling', 'Patek Philippe', 'Audemars Piguet', 'Cartier', 'IWC', 'Panerai', 'Tissot', 'Hamilton', 'Longines'];

// Watch types
const types = ['Diver', 'Chronograph', 'Pilot', 'Dress', 'Sport', 'GMT', 'Moonphase', 'Automatic', 'Quartz', 'Smart'];

// Watch materials
const materials = ['Stainless Steel', 'Gold', 'Titanium', 'Ceramic', 'Rose Gold', 'Platinum', 'Bronze', 'Carbon Fiber'];

// Generate 100 products
const generateProducts = () => {
    const products = [];
    
    // Realistic watch image URLs
    const imageUrls = [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
        'https://images.unsplash.com/photo-1587836374619-2f85a1d98a3e',
        'https://images.unsplash.com/photo-1611692785094-8d7d9e8b2bb6',
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8',
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
        'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
        'https://images.unsplash.com/photo-1594534475808-b18fc33b045e',
        'https://images.unsplash.com/photo-1524805444758-089113d48a6d'
    ];
    
    for (let i = 1; i <= 100; i++) {
        const brand = brands[Math.floor(Math.random() * brands.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        
        const product = {
            name: `${brand} ${type} ${material}`,
            brand: brand,
            price: Math.floor(Math.random() * (50000 - 500) + 500), // Price between $500 and $50,000
            description: `Premium ${type} watch from ${brand}. Features ${material} case with automatic movement, water-resistant up to 100m, sapphire crystal glass, and premium leather strap. Perfect for both casual and formal occasions.`,
            image: `${imageUrl}?w=400&h=400&fit=crop`,
            stock: Math.floor(Math.random() * 50) + 1 // Stock between 1 and 50
        };
        
        products.push(product);
    }
    
    return products;
};

const seedDatabase = async () => {
    try {
        await connectDB();
        
        // Clear existing products
        console.log('Clearing existing products...');
        await Product.deleteMany({});
        
        // Generate and insert products
        console.log('Generating 100 watch products...');
        const products = generateProducts();
        
        console.log('Inserting products into database...');
        await Product.insertMany(products);
        
        console.log('✅ Successfully added 100 products to the database!');
        console.log('Sample products:');
        products.slice(0, 5).forEach((p, idx) => {
            console.log(`${idx + 1}. ${p.name} - $${p.price} (Stock: ${p.stock})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
