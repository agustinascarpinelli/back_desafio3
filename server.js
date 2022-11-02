const express=require('express')
const Container=require('../desafio_2/container')
const Products=new Container('./products.json')
const server=express()
const PORT=8080

server.get('/productos', async(request,response)=>{
    let allProd=await Products.getAll()
    let html = `<h1 style="background-color:grey;">Autos disponibles</h1>`;
	html+=`<ul>`;
	html+=`<li>Nombre</li>`;
	html+=`<li>Precio</li>`;
	html+=`<li>Foto</li>`;
	html+=`</ul>`;
	 for (let p of allProd){
		   html+=`<ul>`;
                   html+=`<li>"${p.title}"</li>`;
                   html+=`<li>"${p.price}"</li>`;
                   html+=`<li>"${p.thumbnail}"</li>`;
                   html+=`</ul>`;
                }
                response.send(html)
})
server.get('/',(req,res)=>{
    res.send(`<h1 style="background-color:grey;">Productos</h1>`);
})

server.get('/*',(req,res)=>{
    res.send(`<h1 style="background-color:red;"> La ruta ingresada no existe</h1>`)
})

server.get('/productoRandom',async(request,response)=>{
    let prods=await Products.getAll()
    let min=1
    let max= prods.length
    let randomID = Math.floor(Math.random() * (max-min) +min)
    let random= prods[randomID]

   
    let html = `<h1 style="background-color:grey;">Producto al azar</h1>`;
             html+=`<ul>`;
             html+=`<li>"${random.title}"</li>`;
             html+=`<li>"${random.price}"</li>`;
             html+=`<li>"${random.thumbnail}"</li>`;
             html+=`</ul>`;

        response.send(html);
})

const app=server.listen(PORT,()=>{

    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})