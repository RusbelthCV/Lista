const express = require("express");
const app = express();
const port = 3000;
const session = require("cookie-session");
const body_parser = require("body-parser");

app.use(body_parser.urlencoded({extended:true}));
app.use(session({ secret: "todotopsecret" }));
app.set("view engine", "jade");

app.use(function(req,res,next){
    if(typeof(req.session.lista) == 'undefined'){
        req.session.lista = [];
        req.session.index = 0;
    }
    next();
});

app.get("/todo",function(req,res){
    res.render("lista",{lista:req.session.lista,index: req.session.index});
});

app.post("/todo/add",function(req,res){
    let tarea = req.body.tarea;
    req.session.lista.push(tarea);
    req.session.index++;

    res.redirect("/todo");
});

app.get("/todo/eliminar/:index",function(req,res){
    if (req.params.index != '') {
        req.session.lista.splice(req.params.index, 1);
    }
    res.redirect("/todo");
});

app.use(function(req,res){
    res.redirect("/todo");
});


app.listen(port,function(){
    console.log("Escuchando desde el puerto: "+port);
});