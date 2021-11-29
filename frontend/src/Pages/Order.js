import {useEffect, useState} from 'react'
import './Order.css'
import {useNavigate} from 'react-router-dom'

function Order() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [town, setTown] = useState('');
  const [zip, setZip] = useState('');
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('cart')??'[]');
    setCart(()=>[...data]);
  },[])
  async function ordering(){
    const data = await fetch('http://localhost:3030/payment',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, number, street, town, zip, cart
        })
    })
    if (data.status === 200){
        setCart([]);
        localStorage.setItem('cart','[]');
        navigate('/advert');
    }
    const response = await data.json();
    console.log(response);
  }
  return (
    <div>
      <div id="center-order">
        <h1 id="title-order">Objednávka</h1>
        <div className="input-block">
            <label htmlFor="username" className="label-order">Meno a Priezvisko</label>
            <input placeholder="Meno a Priezvisko" name="username" onChange={(e)=>{setName(e.target.value)}}/>

            <label htmlFor="email" className="label-order">Email</label>
            <input type="email" placeholder="Email" name="email" onChange={(e)=>{setEmail(e.target.value)}}/>

            <label htmlFor="number" className="label-order">Tel. číslo</label>
            <input type="tel" placeholder="Tel. číslo"  name="number" onChange={(e)=>{setNumber(e.target.value)}}/>
        </div>
        <div className="input-block">
            <label htmlFor="street" className="label-order">Ulica</label>
            <input placeholder="Ulica"  name="street" onChange={(e)=>{setStreet(e.target.value)}}/>

            <label htmlFor="town" className="label-order">Mesto</label>
            <input placeholder="Mesto" name="town" onChange={(e)=>{setTown(e.target.value)}}/>

            <label htmlFor="zip" className="label-order">PSČ</label>
            <input type="number" max="99999" min="0" placeholder="PSČ" name="zip" onChange={(e)=>{setZip(e.target.value)}}/>
        </div>
        <p>Celková suma: {cart.reduce((acc,value)=>{
                acc+= value.price * value.amount;
                return acc
            },0)} EUR</p>
        <button onClick={ordering} id="button-order">Záväzne objednať</button>
      </div>
    </div>
  );
}

export default Order;
