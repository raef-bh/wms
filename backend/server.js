//chargement de module
 const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const  bodyParser = require('body-parser')
const cors = require('cors');


//Lancer une applicatione express
const app =express();
app.use(cors());
app.use(express.json());


//middelware pour lire request.body

app.use(
    express.urlencoded({
        extended : false
    })
)
app.use(bodyParser.json())

//db config
const db = process.env.MONGO_URI ;

//coonect to MongoDb
mongoose.connect(db,{
    useUnifiedTopology :true,
    useNewUrlParser :true,
}
).then(() => console.log("mongoDb sucessufuly connected"))
.catch(err => console.log(err))


//defintion et mise en place du serveur
const port = 3001;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})



const GerantRouter = require ('./routes/GerantRoute')
app.use('/gerant',GerantRouter)

const ProduitRouter = require('./routes/ProduitRoute')
app.use('/produit',ProduitRouter)

//const StockRoute = require('./routes/StockRoute')
//app.use('/stock',StockRoute)

const StocksRoute = require('./routes/StocksRoute')
app.use('/stocks',StocksRoute)


const CommandeRoute = require('./routes/CommandeRoute')
app.use('/commande',CommandeRoute)

const ComposantRoute = require('./routes/ComposantRoute')
app.use('/composant',ComposantRoute)

const LivreurRoute = require('./routes/LivreurRoute')
app.use('/livreur',LivreurRoute)

const FournisseurRoute = require('./routes/FournisseurRoutre')
app.use('/fournissuer',FournisseurRoute)