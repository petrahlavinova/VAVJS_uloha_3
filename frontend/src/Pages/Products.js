import ProductComponent from '../Components/ProductComponent.js'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function Products() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const addToCart = (x)=>{
    setCart(oldCart=>{
        let newCart = oldCart.filter(p => p.id!==x.id);
        let product = oldCart.find(p=>p.id===x.id)??{...x};
        newCart = [...newCart, { ...product, amount: product.amount + 1 } ]
        newCart = newCart.sort((a,b) => a.id-b.id)
        console.log(newCart);
        localStorage.setItem('cart',JSON.stringify(newCart));
        return newCart;
    });
  }
  useEffect(()=>{
    fetch('http://localhost:3030/products').then(d=>d.json()).then(d=>{
      console.log(d);
      setProducts(d.map(p=>{
        p.amount = 0;
        return (
          <ProductComponent product={p} addToCart={addToCart} key={p.id+"-product"}></ProductComponent>
        )
      }))
    }).catch((error)=>{
      console.error(error);
    });
  },[])
  return (
    <div>
        <div className="link-cart">
          <h3 style={{color:"#00ba00"}}>Počet produktov v košíku: {cart.reduce((acc,val)=>{
              acc+= val.amount;
              return acc;
          },0)}</h3>
          <Link to="/cart">Prejsť do košíka</Link>
        </div>
        <div className="product-wrapper">
            {products}
        </div>
    </div>
  );
}

export default Products;
