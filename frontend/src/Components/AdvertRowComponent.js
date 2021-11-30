import { useState } from "react";

function AdvertRowComponent({advert}) {
    const[link,setLink] = useState(advert.link);
    const saveLink = async ()=>{
        const data = await fetch('http://localhost:3030/advert/'+advert.id,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({link})
        });
        const dataJson = await data.json();
        console.log(dataJson.message);
    }
    return (
        <tr>
            <td>{advert.id}</td>
            <td>{advert.image}</td>
            <td>{advert.counter}</td>
            <td>
                <input value={link} onChange={(e)=>setLink(e.target.value)}></input>
            </td>
            <td><button onClick={saveLink}>Uložiť</button></td>
        </tr>
    );
}

export default AdvertRowComponent;
