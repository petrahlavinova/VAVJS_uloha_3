const assert = require('assert');
const fetch = require('node-fetch');
describe('Zahradkarske potreby - TESTY', function() {

  describe('Produkty', function() {
    it('ziskaj vsetky produkty', function() {
        fetch('http://localhost:3030/products').then(d=>d.json()).then(d=>{
            assert.equal(d.length > 0,true)
          }).catch((error)=>{
            console.error(error);
          });
    });
  });
  describe('Objednavky', function() {
    before('vytvorenie objednavky pred testom', function(){
        fetch('http://localhost:3030/payment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:'Janko Testovaci',
                email: 'janicko@gmail.com',
                number: '0908888645',
                street: 'Hlavna',
                town: 'Testovacie Mesto',
                zip: '98888',
                cart: [{id:1,amount:1, price:8.5}]
            })
        })
    })
    it('ziskaj vsetky objednavky', async function() {
        const data = await fetch('http://localhost:3030/orders');
        const parsed = await data.json();
        assert.equal(parsed.length,true);
    });
    it('vytvorenie objednavky',function(){
        fetch('http://localhost:3030/payment',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:'Janko Testovaci',
                email: 'janicko@gmail.com',
                number: '0908888645',
                street: 'Hlavna',
                town: 'Testovacie Mesto',
                zip: '98888',
                cart: [{id:1,amount:1, price:8.5}]
            })
        }).then(d=>d.json()).then(data=>{
            assert.equal(data.message,'Objednavka uspesne zaplatena');
        })
    })
    it('zmena stavu objednavky', async function() {
        const data = await fetch('http://localhost:3030/order/1',{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({status:'delivered'})
        });
        const parsed = await data.json();
        assert.equal(parsed.message,'Úspešne zmenený stav objednávky');
    });
  });
  describe('Reklamy', function() {
    it('ziskaj vsetky reklamy', function() {
        fetch('http://localhost:3030/adverts').then(d=>d.json()).then(d=>{
            assert.equal(d.length > 0,true)
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('ziskaj náhodnu reklamu', function() {
        fetch('http://localhost:3030/advert').then(d=>d.json()).then(d=>{
            assert.equal(typeof d.image, 'string');
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('kliknutie na reklamu', function() {
        fetch('http://localhost:3030/advert/increment/1').then(d=>d.json()).then(d=>{
            assert.equal(typeof d.link, 'string');
          }).catch((error)=>{
            console.error(error);
          });
    });
    it('zmena presmerovania na reklamu', function() {
        fetch('http://localhost:3030/advert/1',{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({link:'https://ladypopular.sk/'})
        }).then(d=>d.json()).then(d=>{
            assert.equal(d.message, 'Úspešne zmenené presmerovanie reklamy');
          }).catch((error)=>{
            console.error(error);
          });
    });
  });
});