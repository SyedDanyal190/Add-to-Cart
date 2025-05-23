import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductList : React.FC = () => {
  const dispatch = useDispatch();

  const products = [
    { id: 1, name: 'Shoe', price: 50 },
    { id: 2, name: 'Hat', price: 20 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <div className="grid gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h4 className="font-semibold">{product.name}</h4>
            <p>${product.price}</p>
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
