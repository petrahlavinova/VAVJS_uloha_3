const express = require('express');
const app = express();
const {Sequelize} = require('sequelize');
const bodyParser = require('body-parser');
const cors = require('cors');
class Order extends Sequelize.Model{}
class Customer extends Sequelize.Model{}
class Advert extends Sequelize.Model{}
class Product extends Sequelize.Model{}
// nazov databazy, uzivatel, heslo, config objekt
const db = new Sequelize('zahradkarske_potreby','root','root',{
    host: 'localhost', // pri dockerizovani db ?
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}))
app.use('/images', express.static('images'))

Product.init({
    name: Sequelize.STRING,
    price: Sequelize.FLOAT,
    image: Sequelize.STRING
},{
    sequelize: db,
    modelName: 'product'
});
Advert.init({
    link: Sequelize.STRING,
    image: Sequelize.STRING,
    counter: Sequelize.INTEGER
},{
    sequelize: db,
    modelName: 'advert'
});
Customer.init({
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    street: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    psc: Sequelize.STRING,
},{
    sequelize: db,
    modelName: 'customer'
});
Order.init({
    finalPrice: Sequelize.FLOAT,
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
    await db.sync({force: true});
    await Product.create({
        name: 'Kvetinka',
        price: 1.89,
        image: 'hihihi.jpg'
    })
    await Product.create({
        name: 'Kaktus',
        price: 1.50,
        image: 'kaktus.jpg'
    })
    await Product.create({
        name: 'Zemina',
        price: 1.19,
        image: 'zemina.jpg'
    })
    // console.log(await Product.findOne({
    //     where: {
    //         id:1
    //     }
    // }))
})();

app.get('/products', async(req,res)=>{
    let products = await Product.findAll({});
    return res.status(200).json(products);
});
