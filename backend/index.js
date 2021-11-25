const express = require('express');
const app = express();
 
app.get('/', (req,res)=>{
    res.send('HELLO')

});
app.listen(3030, ()=>{
    console.log('pocuvam na porte 3030');
});