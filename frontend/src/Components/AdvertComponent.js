function AdvertComponent({advert}) {
    return (
      <div>
        <h1>Ďakujeme za vašu objednávku!</h1>
        <div style={{marginLeft:20}}>
            <h2>Reklama</h2>
            <a href={advert.link} target='_blank' rel="noreferrer">
                <img src={advert.image} width="600" alt={advert.link}/>
            </a>
        </div>
      </div>
    );
  }
  
  export default AdvertComponent;
  