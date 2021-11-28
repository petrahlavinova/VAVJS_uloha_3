import {useEffect, useState} from 'react'

function Cart() {
  const [cart, setCart] = useState([]);
  const [elements, setElements] = useState([]);
  const removeFromCart = (x)=>{
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
            <div>
              <p key={p.id+'-product-cart'}>{p.id}- Produkt: {p.name} -Počet kusov: {p.amount}</p>
              <img src={"http://localhost:3030/images/" + p.image} width="50" alt={p.name}/>
              <button onClick={()=>removeFromCart(p)}>Odobrať z košíka</button>
            </div>
          )
        }));
        return newCart;
    });
  }
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('cart')??'[]');
    setCart(()=>[...data]);
    setElements(data.map(p=>{
      return (
        <div>
          <p key={p.id+'-product-cart'}>{p.id}- Produkt: {p.name} -Počet kusov: {p.amount}</p>
          <img src={"http://localhost:3030/images/" + p.image} width="50" alt={p.name}/>
          <button onClick={()=>removeFromCart(p)}>Odobrať z košíka</button>
        </div>
      )
    }));
  },[])
  return (
    <div>
      <div>
        <h1>Košík</h1>
        {elements}
      </div>
    </div>
  );
}

export default Cart;