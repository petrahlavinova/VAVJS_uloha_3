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
    town: Sequelize.STRING,
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
    foreignKey: 'order_id'
})
Product.belongsToMany(Order,{
    through:'order_product',
    foreignKey: 'product_id'
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
    await Advert.create({
        link: 'https://ladypopular.sk/',
        image: 'https://static-ladypopular.com/ladypopular/gate/img/ladypopular3/pink/logos/logo-sk.png',
        counter: 0
    })
    await Advert.create({
        link: 'https://carbon.now.sh/',
        image: 'https://carbon.now.sh/static/brand/banner.png',
        counter: 0
    })
    await Advert.create({
        link: 'https://cp.hnonline.sk/vlakbusmhd/spojenie/',
        image: 'https://cp.hnonline.sk/Portal/MAFRASK/Part/Img/logo-192x192.png',
        counter: 0
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

app.post('/payment', async(req,res)=>{
    const {name, email, number, street, town, zip, cart} = req.body;
    try{
        const customer = await Customer.create({
            email: email,
            name: name,
            street: street,
            phoneNumber: number,
            town: town,
            psc: zip,
        })
        const order = await Order.create({
            finalPrice: cart.reduce((acc,value)=>{
                acc+= value.price * value.amount;
                return acc
            },0),
            status: 'Zaplatena'
        })
        await order.addProducts(cart.map(p=>p.id));
        await order.setCustomer(customer);
    }
    catch(error){
        return res.status(500).send(error);
    }
    return res.status(200).json({message: 'Objednavka uspesne zaplatena'});
});

app.get('/advert', async(req,res)=>{
    let advert = await Advert.findOne({
        order: db.random(),
    });
    return res.status(200).json(advert);
});
