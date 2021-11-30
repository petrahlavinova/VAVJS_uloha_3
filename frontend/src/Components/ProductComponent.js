import './Product.css'

function ProductComponent({product, addToCart}) {
  return (
    <div className="product-block">
        <h2>Názov produktu: {product.name}</h2>
        <img src={"http://localhost:3030/images/" + product.image} width="200" height="200" alt={product.name}/>
        <h3>Cena: {product.price.toFixed(2)} EUR</h3>
        <button onClick={()=>addToCart(product)}>Pridať do košíka</button>
    </div>
  );
}

export default ProductComponent;
