const axios = require('axios')
const assert = require('assert');
describe('Zahradkarske potreby - TESTY', function() {

  describe('Produkty', function() {
    it('ziskaj vsetky produkty', function() {
        axios.get('http://localhost:3030/products').then(({data})=>{
            assert.equal(data.length > 0,true)
          }).catch((error)=>{
            console.error(error);
          });
    });
  });
  describe('Objednavky', function() {
    before('vytvorenie objednavky pred testom', function(){
      axios.post('http://localhost:3030/payment',{
        name:'Janko Testovaci',
        email: 'janicko@gmail.com',
        number: '0908888645',
        street: 'Hlavna',
        town: 'Testovacie Mesto',
        zip: '98888',
        cart: [{id:1,amount:1, price:8.5}]
      })
    })
    it('ziskaj vsetky objednavky', function() {
        axios.get('http://localhost:3030/orders').then(({data})=>{
          assert.equal(data.length > 0, true);
        }).catch((error)=>{
          console.error(error);
        });
        
    });
    it('vytvorenie objednavky',function(){
        axios.post('http://localhost:3030/payment',{
          name:'Janko Testovaci',
          email: 'janicko@gmail.com',
          number: '0908888645',
          street: 'Hlavna',
          town: 'Testovacie Mesto',
          zip: '98888',
          cart: [{id:1,amount:1, price:8.5}]
        }).then(({data})=>{
            assert.equal(data.message,'Objednavka uspesne zaplatena');
        })
    })
    it('zmena stavu objednavky', function() {
        axios.put('http://localhost:3030/order/1',{status:'delivered'}).then(({data})=>{
          assert.equal(data.message,'Úspešne zmenený stav objednávky');
        }).catch((error)=>{
          console.error(error);
        });
    });
  });
  describe('Reklamy', function() {
    it('ziskaj vsetky reklamy', function() {
        axios.get('http://localhost:3030/adverts').then(({data})=>{
            assert.equal(data.length > 0,true)
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('ziskaj náhodnu reklamu', function() {
        axios.get('http://localhost:3030/advert').then(({data})=>{
            assert.equal(typeof data.image, 'string');
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('kliknutie na reklamu', function() {
        axios.get('http://localhost:3030/advert/increment/1').then(({data})=>{
            assert.equal(typeof data.link, 'string');
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('zmena presmerovania na reklamu', function() {
        axios.put('http://localhost:3030/advert/1',{link:'https://ladypopular.sk/'}).then(({data})=>{
            assert.equal(data.message, 'Úspešne zmenené presmerovanie reklamy');
          }).catch((error)=>{
            console.error(error);
          });
    });
  });
});