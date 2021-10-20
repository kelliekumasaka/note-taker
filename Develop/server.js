const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const api = require("./db/db.json");
const path = require("path");
const uuid = require("./helpers/uuid");

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,`./public/index.html`))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, `./public/notes.html`))
});

app.post("/notes", (req, res) => {
    const { title, text } = req.body;
    console.log(req.body)
    if(req.body){
        const newBody = {
            title,
            text,
            id: uuid()
        }
        api.push(newBody);
        fs.writeFileSync("./db/db.json",JSON.stringify(api,null,4));
        console.log("got it!");
        res.json({message:"duly noted"});
    }else{
        res.error("Could not complete");
    }
});

app.get("/api/notes", (req,res) => {
    res.json(api);
});

app.listen(PORT,()=>{
    console.log("Listenin to the lofi beats of http://localhost:" + PORT)
});