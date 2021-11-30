import {useNavigate} from 'react-router-dom'
import './Advert.css'
import {Link} from 'react-router-dom'

function AdvertComponent({advert}) {
    const navigate = useNavigate();
    const increment = async ()=>{
      const data = await fetch('http://localhost:3030/advert/increment/'+advert.id);
      const dataJson = await data.json();
      window.open(dataJson.link);
      navigate('/');
  }
    return (
      <div>
      <Link to="/" className="link-cart">Späť na produkty</Link>
        <h1 id="title-order">Ďakujeme za vašu objednávku!</h1>
        <div style={{textAlign:"center"}}>
            <h2>Reklama</h2>
            <img src={advert.image} onClick={increment}width="600" alt="reklama"/>
        </div>
      </div>
    );
  }
  
  export default AdvertComponent;
  