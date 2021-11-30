import {useCallback, useEffect, useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [elements, setElements] = useState([]);
  const removeFromCart = useCallback((x)=>{
    setCart(oldCart=>{
        let newCart = oldCart.filter(p => p.id!==x.id);
        let product = oldCart.find(p=>p.id===x.id);
        if (product.amount > 1){
          newCart = [...newCart, { ...product, amount: product.amount - 1 } ]
        }
        newCart = newCart.sort((a,b) => a.id-b.id)
        console.log(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart));
        setElements(newCart.map(p=>{
          return (
            <div key={p.id+'-product-cart'} className="text-cart input-block"> {/* pri kazdom mapovani kazdy prvok musi mat jedinecny kluc aby sa nepokazil render pri zmene dat*/}
              <p className="text-cart">ID:{p.id}</p>
              <p className="text-cart"> Názov: {p.name}</p>
              <p className="text-cart"> Počet kusov: {p.amount}</p>
              <p className="text-cart"> Cena: {p.price.toFixed(2)} EUR</p>
              <img src={"http://localhost:3030/images/" + p.image} width="50" alt={p.name}/>
              <button onClick={()=>removeFromCart(p)}>Odobrať z košíka</button>
            </div>
          )
        }));
        return newCart;
    });
  },[setCart, setElements])
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('cart')??'[]');
    setCart(()=>[...data]);
    setElements(data.map(p=>{
      return (
        <div key={p.id+'-product-cart'} className="text-cart input-block">
          <p className="text-cart">ID:{p.id}</p>
          <p className="text-cart"> Názov: {p.name}</p>
          <p className="text-cart"> Počet kusov: {p.amount}</p>
          <p className="text-cart"> Cena: {p.price.toFixed(2)} EUR</p>
          <img src={"http://localhost:3030/images/" + p.image} width="100" alt={p.name}/>
          <button onClick={()=>removeFromCart(p)}>Odobrať z košíka</button>
        </div>
      )
    }));
  },[removeFromCart])
  return (
    <div>
      <div id="center-order">
        <Link to="/" className="link-cart">Späť na produkty</Link>
        <div>
          <h1 id="title-order">Košík</h1>
          {cart.length === 0 && 
            <>
              <h2 className="text-cart">Košík je prázdny</h2>
              <img src="http://localhost:3030/images/kosik.png" width="200" alt='kosik'/>
            </>
          }
          {cart.length > 0 && 
            <>
              <div id="cart-wrapper">
              {elements}<br/>
              <button onClick={()=>navigate('/order')}>Dokončiť objednávku</button>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Cart;
