const express = require('express');
const app = express();
const {Sequelize} = require('sequelize')
class Order extends Sequelize.Model{}
class Customer extends Sequelize.Model{}
class Advert extends Sequelize.Model{}
class Product extends Sequelize.Model{}
// nazov databazy, uzivatel, heslo, config objekt
const db = new Sequelize('zahradkarske_potreby','root','root',{
    host: 'localhost', // pri dockerizovani db ?
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

Product.init({
    nazov: Sequelize.STRING,
    cena: Sequelize.FLOAT,
    obrazok: Sequelize.STRING
},{
    sequelize: db,
    modelName: 'product'
});
Advert.init({
    link: Sequelize.STRING,
    obrazok: Sequelize.STRING,
    pocitadlo: Sequelize.INTEGER
},{
    sequelize: db,
    modelName: 'advert'
});
Customer.init({
    email: Sequelize.STRING,
    celeMeno: Sequelize.STRING,
    ulica: Sequelize.STRING,
    telCislo: Sequelize.STRING,
    psc: Sequelize.STRING,
},{
    sequelize: db,
    modelName: 'customer'
});
Order.init({
    celkoveCena: Sequelize.FLOAT,
    status: Sequelize.STRING
},{
    sequelize: db,
    modelName: 'order'
});

Order.belongsTo(Customer);
Customer.hasOne(Order);
Order.belongsToMany(Product,{
    through:'order_product',
    foreignKey: 'product_id'
})
Product.belongsToMany(Order,{
    through:'order_product',
    foreignKey: 'order_id'
})


app.get('/', (req,res)=>{
    res.send('HELLO')

});
app.listen(3030, ()=>{
    console.log('pocuvam na porte 3030');
});

(async function(){
    await db.sync();
    await Product.create({
        nazov: 'Kvetinka',
        cena: 1.89,
        obrazok: 'hihihi.jpg'
    })
    console.log(await Product.findOne({
        where: {
            id:1
        }
    }))
})();
