const mongoose = require("mongoose");
const Chat = require("./models/chats.js");



main().then(() => console.log("connection successfully"));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [
    {
        from: "amit",
        to: "sumit",
        msg: "sent me a JS notes",
        created_at: new Date(),
    },
    {
        from: "raju",
        to: "sham",
        msg: "kaha hai re baba tu..",
        created_at: new Date(),
    },
    {
        from: "virat",
        to: "rohit",
        msg: "cricket khelne chalo ge ",
        created_at: new Date(),
    },
    {
        from: "ganpat",
        to: "karun",
        msg: "sent me 100rs",
        created_at: new Date(),
    },
    {
        from: "baburao",
        to: "ganpatrao",
        msg: "daru pine chale :)",
        created_at: new Date(),
    }
]

Chat.insertMany(allChats);