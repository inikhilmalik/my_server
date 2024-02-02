const express = require("express");
const multer = require('multer');

const { dataModal } = require("../models/data.model");
const { PicModal } = require("../models/pic.model");

const picRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, (file.fieldname + '-' + Date.now() + "-" + Math.random() + file.originalname).split(" ").join(""));
    },
});

const upload = multer({ storage: storage });

picRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id,"idii")
    try {
        const data = await PicModal.find({ projectTaskId: id });
        console.log(data,"data")
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})

picRouter.post("/create", upload.single('image'), async (req, res) => {
    // const { id } = req.params;
    console.log("reeeq",req.body.id)
    console.log("reeeq",req.body.date)
    console.log("reee",req.file)
    try {
        const data = new PicModal({image:req.file.filename,fileName:req.file.originalname, projectTaskId:req.body.id, postedDate:req.body.date, approvedDate:"", version:0});
        await data.save();
        res.send("image is added")
    }
    catch (err) {
        res.send({ "err": err.message })
    }
})

// picRouter.post("/create/:id", upload.array('image', 10), async (req, res) => {
//     const { id } = req.params;
//     const images = req.files.map((file) => ({
//         pic: file.filename,
//         action: false,
//     }));
//     console.log(id)
//     console.log(images)
//     try {
//         const data = new PicModal({images,projectTaskId:id});
//         await data.save();
//         res.send("image is added")
//     }
//     catch (err) {
//         res.send({ "err": err.message })
//     }
// })

// picRouter.post("/create",async(req,res)=>{
//     try{
//         const data=new PicModal(req.body);
//         await data.save();
//         res.send("data is added")
//     }catch(err){
//         res.send({"err":err.message})
//     }
// })

picRouter.delete("/deleteImages/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        await PicModal.findByIdAndDelete({ _id: id });
        res.send("data is deleted")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

picRouter.patch("/updateImage/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        await PicModal.findByIdAndUpdate({ _id: id }, req.body);
        res.send("image data is updated")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

// picRouter.patch("/updateImages/:id", upload.array('image', 10), async (req, res) => {
//     const { id } = req.params;
//     const images = req.files.map((file) => ({
//         pic: file.filename,
//         action: false,
//     }));
//     console.log(id)
//     console.log(images)
//     try {
//         await PicModal.findByIdAndUpdate({ _id: id }, { images })
//         res.send("image is added")
//     }
//     catch (err) {
//         res.send({ "err": err.message })
//     }
// })

module.exports = { picRouter }