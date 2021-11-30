import {useEffect, useState} from 'react'
import AdvertRowComponent from '../Components/AdvertRowComponent.js';
import OrderRowComponent from '../Components/OrderRowComponent.js';


function Admin() {
  const [orders, setOrders] = useState([]);
  const [adverts, setAdverts] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:3030/orders').then(d=>d.json()).then(d=>{
      console.log(d);
      setOrders(d.map(o=>{
        return (
          <OrderRowComponent order={o} key={o.id+"-order"}/>
        )
      }))
    }).catch((error)=>{
      console.error(error);
    });
    fetch('http://localhost:3030/adverts').then(d=>d.json()).then(d=>{
      console.log(d);
      setAdverts(d.map(a=>{
        return (
          <AdvertRowComponent advert={a} key={a.id+"-advert"}/>
        )
      }))
    }).catch((error)=>{
      console.error(error);
    });
  },[])

  return (
    <div>
        <h1>Objednávky</h1>
        <table>
            <thead>
                <tr>
                    <td>ID:</td>
                    <td>Celková cena:</td>
                    <td>Zákaznik:</td>
                    <td>Email:</td>
                    <td>Status:</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {orders}
            </tbody>
        </table>
        <h1>Reklamy</h1>
        <table>
            <thead>
                <tr>
                    <td>ID:</td>
                    <td>Obrázok:</td>
                    <td>Počet kliknutí:</td>
                    <td>Link:</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {adverts}
            </tbody>
        </table>
    </div>
  );
}

export default Admin;
