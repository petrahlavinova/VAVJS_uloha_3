import {useEffect, useState} from 'react'
import AdvertComponent from '../Components/AdvertComponent';

function Advert() {
    const [advert, setAdvert] = useState({
        link: '',
        image: '',
        counter: 0
    });
    useEffect(()=>{
        fetch('http://localhost:3030/advert').then(d=>d.json()).then(data=>{setAdvert(data)})
    },[])
    return (
        <div>
            <div>
                <AdvertComponent advert={advert}/>
            </div>
        </div>
    );
}

export default Advert;
