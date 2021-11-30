import { useState } from "react";

function OrderRowComponent({order}) {
    const[status,setStatus] = useState(order.status);
    const saveStatus = async ()=>{
        const data = await fetch('http://localhost:3030/order/'+order.id,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status})
        });
        const dataJson = await data.json();
        console.log(dataJson.message);
    }
    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.finalPrice}</td>
            <td>{order.customer.name}</td>
            <td>{order.customer.email}</td>
            <td>
                <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option value="created">Vytvorená</option>
                    <option value="delivered">Doručená</option>
                    <option value="canceled">Zrušená</option>
                </select>
            </td>
            <td><button onClick={saveStatus}>Uložiť</button></td>
        </tr>
    );
}

export default OrderRowComponent;
