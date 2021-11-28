import ProductComponent from '../Components/ProductComponent.js'
import {useEffect, useState} from 'react'

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3030/products').then(d=>d.json()).then(d=>{
      console.log(d);
      setProducts(d.map(p=>{
        return (
          <ProductComponent product={p}></ProductComponent>
        )
      }))
    }).catch();
  },[])
  return (
    <div className="container">
      <div className="row">
        {products}
      </div>
    </div>
  );
}

export default Products;
