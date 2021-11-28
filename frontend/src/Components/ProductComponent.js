function ProductComponent({product}) {
  return (
    <div>
        <h2>Nazov produktu:{product.name}</h2>
        <h3>Cena:{product.price} EUR</h3>
        <img src={"http://localhost:3030/images/" + product.image} alt={product.name}/>
    </div>
  );
}

export default ProductComponent;
