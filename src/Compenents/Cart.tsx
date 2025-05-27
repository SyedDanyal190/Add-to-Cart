// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import type { RootState, AppDispatch } from '../redux/store';
// import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartSlice';
// import { toast } from 'react-toastify';

// const Cart: React.FC = () => {
//   const items = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch<AppDispatch>();

//   const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="max-w-4xl mx-auto p-4 mt-24">
//       <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//       {items.length === 0 ? (
//         <p className="text-gray-600">Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-4 mb-6">
//             {items.map(item => (
//               <li key={item.id} className="flex justify-between items-center border-b pb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold">{item.name}</h2>
//                   <p className="text-gray-600">${item.price.toFixed(2)}</p>
//                   <div className="flex items-center mt-2 space-x-2">
//                     <button
//                       onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
//                       className="bg-gray-300 px-2 rounded"
//                     >
//                       −
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() => dispatch(increaseQuantity({ id: item.id }))}
//                       className="bg-gray-300 px-2 rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => {
//                     dispatch(removeFromCart({ id: item.id }));
//                     toast.error(`${item.name} removed from cart`);
//                   }}
//                   className="text-red-600 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between items-center     ">
//             <button
//               onClick={() => {
//                 dispatch(clearCart());
//                 toast.info('Cart cleared');
//               }}
//               className="bg-red-500 text-green px-4 py-2 rounded hover:bg-red-600"
//             >
//               Clear Cart
//             </button>
//             <div className="text-right font-bold text-xl">
//               Total: ${total.toFixed(2)}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Cart;










import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import PaymentForm from '../Compenents/Payment'; // import the component

const Cart  = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const [checkout, setCheckout] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : checkout ? (
        <PaymentForm amount={total * 100}  items={items} /> 
        // {/* amount in cents */}
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {items.map(item => (
              <li key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                      className="bg-gray-300 px-2 rounded"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                      className="bg-gray-300 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => {
                    dispatch(removeFromCart({ id: item.id }));
                    toast.error(`${item.name} removed from cart`);
                  }}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                dispatch(clearCart());
                toast.info('Cart cleared');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
            <div className="text-right font-bold text-xl">
              Total: ${total.toFixed(2)}
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={() => setCheckout(true)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
