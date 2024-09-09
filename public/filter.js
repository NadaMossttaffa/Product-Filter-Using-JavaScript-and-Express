document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const priceMinInput = document.getElementById('priceMin');
    const priceMaxInput = document.getElementById('priceMax');
    const brandSelect = document.getElementById('brand');
    const productList = document.getElementById('product-list');
    const fetchAndDisplayProducts = () => {
        const category = categorySelect.value;
        const priceMin = priceMinInput.value ? parseFloat(priceMinInput.value) : 0;
        const priceMax = priceMaxInput.value ? parseFloat(priceMaxInput.value) : Infinity;
        const brand = brandSelect.value;
        const params = new URLSearchParams({
            category,
            priceMin,
            priceMax,
            brand
        });
        fetch(`/api/products?${params.toString()}`)
            .then(response => response.json())
            .then(products => {
                productList.innerHTML = '';
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
                    productDiv.setAttribute('data-category', product.category);
                    productDiv.setAttribute('data-price', product.price);
                    productDiv.setAttribute('data-brand', product.brand);
                    productDiv.innerHTML = `
                        <h3>${product.name}</h3>
                        <p>${product.category} - $${product.price} - ${product.brand}</p>
                    `;
                    productList.appendChild(productDiv);
                });
            })
            .catch(err => console.error('Error fetching products:', err));
    };
    categorySelect.addEventListener('change', fetchAndDisplayProducts);
    priceMinInput.addEventListener('input', fetchAndDisplayProducts);
    priceMaxInput.addEventListener('input', fetchAndDisplayProducts);
    brandSelect.addEventListener('change', fetchAndDisplayProducts);
    fetchAndDisplayProducts();
});