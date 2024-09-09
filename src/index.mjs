import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 3001;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/filter.html'));
});
app.get('/api/products', (req, res) => {
    const products = [
        { category: 'Electronics', price: 200, brand: 'Samsung', name: 'Tablet'},
        { category: 'Clothing', price: 50, brand: 'LCWaiKiki', name: 'Hoodie'},
        { category: 'Books', price: 15, brand: 'Dawen bookstore', name: 'Space Book'},
        { category: 'Electronics', price: 500, brand: 'Samsung', name: 'Mobile Phone'},
        { category: 'Electronics', price: 150, brand: 'Samsung', name: 'Mobile Phone'},
        { category: 'Clothing', price: 80, brand: 'LCWaiKiki', name: 'Baggy Jeans'},
        { category: 'Books', price: 10, brand: 'Dawen bookstore', name: 'The Kite Runner'},
        { category: 'Clothing', price: 90, brand: 'LCWaiKiki', name: 'Dress'},
        { category: 'Clothing', price: 190, brand: 'LCWaiKiki', name: 'Coat'}
    ];
    const category = req.query.category || '';
    const priceMin = parseFloat(req.query.priceMin) || 0;
    const priceMax = parseFloat(req.query.priceMax) || Infinity;
    const brand = req.query.brand || '';
    const filteredProducts = products.filter(product => 
        (category === '' || product.category === category) &&
        (product.price >= priceMin && product.price <= priceMax) &&
        (brand === '' || product.brand === brand)
    );
    res.json(filteredProducts);
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
