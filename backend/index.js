const express = require('express');
const app = express();
const {Sequelize} = require('sequelize')
class Objednavka extends Sequelize.Model{}
class Zakaznik extends Sequelize.Model{}
class Reklama extends Sequelize.Model{}
class Produkt extends Sequelize.Model{}

Produkt.init({
    nazov: Sequelize.STRING,
    cena: Sequelize.FLOAT,
    obrazok: Sequelize.STRING
});
Reklama.init({
    link: Sequelize.STRING,
    obrazok: Sequelize.STRING,
    pocitadlo: Sequelize.INTEGER
});
Zakaznik.init({
    email: Sequelize.STRING,
    celeMeno: Sequelize.STRING,
    ulica: Sequelize.STRING,
    telCislo: Sequelize.STRING,
    psc: Sequelize.STRING,
});
Objednavka.init({
    celkoveCena: Sequelize.FLOAT,
    status: Sequelize.STRING
});

Objednavka.belongsTo(Zakaznik);
Zakaznik.hasOne(Objednavka);


app.get('/', (req,res)=>{
    res.send('HELLO')

});
app.listen(3030, ()=>{
    console.log('pocuvam na porte 3030');
});