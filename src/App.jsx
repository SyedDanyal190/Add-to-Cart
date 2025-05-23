
import './App.css'
import Cart from './Compenents/Cart'
import ProductList from './Compenents/ProductList'

function App() {

  return (

<>
 <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">My Store</h1>
  <ProductList />
  <Cart />
    </div>


</>

  )
}

export default App
