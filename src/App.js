import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbars from './components/Navbar';
import './Styles/Style.css';
import { useContext, useEffect, useState } from 'react';

import { Route, Routes, useNavigate} from "react-router-dom";

import Home from "./pages/Home";
import Profile from './pages/Profile';
import EditeProfile from './pages/EditeProfile';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import EditeProfilePartner from './pages/EditeProfilePartner';
import ProfilePartner from './pages/ProfilePartner';
import AddProduct from './pages/AddProduct';
import IncomeTransaction from './pages/IncomeTransaction';
import { API, setAuthToken } from './config/api';

import PaketGeprek from './Pictures/bensu menu/paket geprek.png'
import PaketGeprekKeju from './Pictures/bensu menu/geprek keju.png'
import PaketGeprekLeleh from './Pictures/bensu menu/geprek leleh.png'
import PaketSambelMatah from './Pictures/bensu menu/sambel matah.png'
import MieAyamGeprek from './Pictures/bensu menu/mie ayam geprek.png'
import MieAyamGeprekKeju from './Pictures/bensu menu/mie ayam geprek keju.png'
import MieAyamLeleh from './Pictures/bensu menu/mie ayam leleh.png'
import { UserContext } from './context/userContext';

 

function App() {
  const navigate = useNavigate();
  
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  }, [state]);

  
  
  const checkUser = async () => {
    try {
     
      const response = await API.get("/check-auth");
      // console.log(response);

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    checkUser();
  }, []);

  const [cart,setCart] = useState([])
  const [products,setProducts] = useState([
    {
      id : 1,
      name : "Paket Geprek",
      image : PaketGeprek,
      harga : 15,
      cart : false,
      quantity : 1,
  },
  {
      id : 2,
      name : "Paket Geprek",
      image : PaketGeprekKeju,
      harga : 20,
      cart : false,
      quantity : 1,
    },
    {
      id : 3,
      name : "Paket Geprek",
      image : PaketGeprekLeleh,
      harga : 25,
      cart : false,
      quantity : 1,
    },
    {
      id : 4,
      name : "Paket Geprek",
      image : PaketSambelMatah,
      harga : 15,
      cart : false,
      quantity : 1,
    },
  {
      id : 5,
      name : "Paket Geprek",
      image : MieAyamGeprek,
      harga : 17,
      cart : false,
      quantity : 1,
    },
    {
      id : 6,
      name : "Paket Geprek",
      image : MieAyamGeprekKeju,
      harga : 22,
      cart : false,
      quantity : 1,
    },
  {
      id :7,
      name : "Paket Geprek",
      image : MieAyamLeleh,
      harga : 27,
      cart : false,
      quantity : 1,
    },
    {
      id : 8,
      name : "Mie Ayam Sambel Telur Asin",
      image : PaketGeprek,
      harga : 22,
      cart : false,
      quantity : 1,
    }
  ])


  function AddToCart(item) {
    let cart2 = [...cart]
    cart2.push({ ...item })
    products.map((i) => {
      if (i.id == item.id) {
        i.cart = true
      }
    })
    setCart(cart2)
  }

function RemoveFromCart(item) {
  let cart2 = cart.filter((i) => i.id != item.id)
  products.map((i) => {
    if (i.id == item.id) {
      i.cart = false
    }
  })
  setCart(cart2)
}

function Add(item) {
  let x = cart.map((i) => {

    if (item.id == i.id) {
      console.log('hola')
      i.quantity += 1
    }
    return i
  })
  setCart(x)

}

function Less(item) {
  let x = cart.map((i) => {

    if (item.id == i.id && i.quantity > 1) {
      i.quantity -= 1
    }
    return i
  })
  setCart(x)
}

function Total() {
  let x = 0
  cart.map((i) => {
    x += i.harga * i.quantity+10

  })
  return x
}

function SubTotal() {
  let x = 0
  cart.map((i) => {
    x += i.harga * i.quantity

  })
  return x
}

function TotalQuantity() {
  let x = 0
  cart.map((i) => {
    x += i.quantity

  })
  return x
}

  
  return (
<>
    <div className=''>
      <Navbars orderan={TotalQuantity()} />
    </div>
    <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path='/profile/:id' element={<Profile/>}/>
        <Route exact path='/edite-profile/:id' element={<EditeProfile/>}/>
        <Route exact path='/restaurant-menu/:id' element={<RestaurantMenu 
        menud={products} 
        cart={cart} 
        orderan={AddToCart}
        />}/>
        <Route exact path='/cart/:id' element={<Cart 
        cart={cart}
        total={Total()}
        quantity={TotalQuantity()}
        subTotal={SubTotal()}
        add={Add}
        less={Less}
        remove={RemoveFromCart}
        />}/>
        <Route exact path='/edite-profile-partner/:id' element={<EditeProfilePartner/>}/>
        <Route exact path='/profile-partner/:id' element={<ProfilePartner/>}/>
        <Route exact path='/add-product/:id' element={<AddProduct/>}/>
        <Route exact path='/income-transaction/:id' element={<IncomeTransaction/>}/>
      </Routes>
      </>
  );
}

export default App;
