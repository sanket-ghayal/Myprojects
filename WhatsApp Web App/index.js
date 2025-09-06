const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js"); 
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(() => console.log("connection successfully"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


// Index route
app.get("/chats", async (req , res) =>{
    let chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs" ,{chats});
})


// New route
app.get("/chats/new" , (req , res) => {
    res.render("new.ejs");
})

// Create route
app.post("/chats" , (req , res) =>{
    let {from , to , msg}  = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })

   newChat.save().then((res) => {
    console.log("new message working");
   }).catch((err) =>{
    console.log(err);
   })
   res.redirect("/chats");

});

// Edit Route
app.get("/chats/:id/edit" , async (req , res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs" , {chat});
})

// Update Route
app.put("/chats/:id", async (req , res) =>{
    let {id} = req.params;
    let { msg: newMsg } =  req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg} , {runValidator : true , new : true});
    console.log(updatedChat);
    res.redirect("/chats");
});


// Delete Rout
app.delete("/chats/:id/delete" , async (req , res) => {
   let {id} = req.params;
   let deletedChat = await Chat.findByIdAndDelete(id);
   console.log(deletedChat);
   res.redirect("/chats");
});


app.get("/", (req , res) => {
    res.send("successfully root path is running");
});

app.listen(8080, ()=>{
    console.log("listning sucessfully on port 8080");
});

