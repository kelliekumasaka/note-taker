const fs = require("fs");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const api = require("./Develop/db/db.json");
const path = require("path");
const uuid = require("./Develop/helpers/uuid");

app.use(express.static("./Develop/public"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,`./Develop/public/index.html`))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, `./Develop/public/notes.html`))
});

app.post("/api/notes", (req, res) => {
    const { title, text, id } = req.body;
    if(req.body){
        const newBody = {
            title,
            text,
            id:uuid()
        }
        api.push(newBody);
        fs.writeFileSync("./Develop/db/db.json",JSON.stringify(api,null,4));
        console.log("got it!");
        res.json({message:"duly noted"});
    }else{
        res.error("Could not complete");
    }
});

app.get("/api/notes/:id", (req, res) => {
    for (let i = 0; i < api.length; i++) {
        if (req.params.id == api[i].id){
            return res.json(api[i])
        }else{
            return res.json("wrong id number!");
        }
    }
})

app.delete("/api/notes/:id", (req, res) => {
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(api.filter(note => note.id != req.params.id), null, 4));
    console.log("goodbye, note");
    res.json({ok: true});
    location.reload();
})

app.get("/api/notes", (req,res) => {
    res.json(api);
});

app.listen(PORT,()=>{
    console.log("Listenin to the lofi beats of http://localhost:" + PORT)
});