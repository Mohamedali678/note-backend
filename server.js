const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())

//database connection
mongoose.connect("mongodb://0.0.0.0:27017/NoteProject2").then(() => console.log("Database has been connected successfully")).catch((error) => {
    console.log(error);
})


//insert API starts
const noteModel = require("./model/noteModel");


app.post("/api/create", async (req, res) => {
    const newData = noteModel(req.body)
    const savedData = await newData.save();
    res.send(savedData)
})


//Read API Starts here
app.get("/notes", async (req, res) => {
    const getData = await noteModel.find();
    res.send(getData)
})


// Delete API starts

app.delete("/note/delete/:id", async (req, res) => {
    const deleteData = await noteModel.deleteOne({
        _id: req.params.id
    })
    if(deleteData){
        res.send("Note deleted successfully")
    }
    else {
        res.send("There is erro")
    }

})


//update API
app.put("/note/update/:id", async (req, res) => {
    const updateData = await noteModel.updateOne(
        {
        _id: req.params.id
        },
        {$set: req.body})
    res.send(updateData)
})




//single API Starts
app.get("/note/single/:id", async (req, res) => {
    const data = await noteModel.findOne({
        _id: req.params.id
    })

    res.send(data)

})







app.listen(1000, () => console.log("Server is running on port 1000"))