const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

let items =['Do homework', 'Eat food'];
let workItems = [];

app.get("/", function(req, res){
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        
    };
    
    let day = new Date().toLocaleDateString("es-US", options);

    res.render("list", {listTitle: day, newItems: items});
 });

app.post("/", function(req, res){
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        console.log(workItems);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", newItems: workItems});
})

app.post("/work", function(req, res) {
    console.log(req.body);
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work"); 
})

app.listen(3000, function(){
    console.log("connected");
});