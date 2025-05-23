import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import { AppDispatch, RootState } from '../redux/store';

const Cart:React.FC = () => {
const dispatch = useDispatch<AppDispatch>();
const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="p-4 mt-6 border-t">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <span>{item.name} - ${item.price}</span>
              <button
                onClick={() => dispatch(removeFromCart(item))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
