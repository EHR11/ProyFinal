import express from "express"
import mongoose from "mongoose"
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"

const app= express()
console.log(app)

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080

mongoose.connect("mongodb+srv://rojasemilianohernan:RBo75iYp2IupkITG@clusterdevbackend.p3bxdmy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDevBackend")
.then(()=>{
    console.log("Conectado a la DB")
})
.catch(error=>{
    console.error("Error al conectar con la DB", error)
})

app.use("/products",productRouter)
app.use("/carts",cartRouter)
app.use("/",viewsRouter)

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
})

