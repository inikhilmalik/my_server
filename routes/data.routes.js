const express = require("express");
const multer = require('multer');

const { dataModal } = require("../models/data.model");

const dataRouter = express.Router();

dataRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id,"id")
    try {
        const data = await dataModal.find({ projectID: id }).sort({ order: 1 });
        // console.log(data,"data")
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.get("/singledata/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id,"id")
    try {
        const data = await dataModal.find({ _id: id });
        // console.log(data,"data")
        res.send(data)
    } catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.post("/create", async (req, res) => {
    try {
        const data = new dataModal(req.body);
        await data.save();
        res.send("data is added")
    } catch (err) {
        res.send({ "err": err.message })
    }
})


dataRouter.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    try {
        await dataModal.findByIdAndUpdate({ _id: id }, req.body);
        res.send("data is updated")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.post("/updateData/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    // console.log(req.body, "body/....../")
    try {
        if (id) {
            await dataModal.deleteMany({ projectID: id })
            const checkData = await dataModal.find({ projectID: id });
            console.log(checkData, "checkDataaaaa")
            if(checkData.length==0){
                await dataModal.insertMany(req.body);
            }
            res.send("updation")
        }
        else {
            res.send("Something went wrong try again later")
        }
    } catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.post("/insertData", async (req, res) => {
    // console.log(req)
    try {
        await dataModal.insertMany(req.body);
        // console.log("=1=1=1=1=1=1=",templateData)
        res.send("data created")
    } catch (err) {
        res.send({ "err": err.message })
    }
})
dataRouter.post("/importData", async (req, res) => {
    const { projectTemplateId, projectId } = req.body
    // console.log(req.body)
    try {
        const templateData = await dataModal.find({ projectID: projectTemplateId }, { _id: 0 });
        // let newData = []
        if (templateData.length > 0) {
            for (let i = 0; i < templateData.length; i++) {
                templateData[i]["projectID"] = projectId;
                // delete templateData[i]["_id"]
                // newData.push({ ...templateData[i], projectID: projectId })
            }
            await dataModal.insertMany(templateData);
        }
        // console.log("=1=1=1=1=1=1=",templateData)
        res.send("Data Inserted")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

// dataRouter.post("/importData", async (req, res) => {
//     try {
//         await dataModal.insertMany(req.body);
//         res.send("Data Inserted")
//     } catch (err) {
//         res.send({ "err": err.message })
//     }
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, (file.fieldname + '-' + Date.now() + "-" + Math.random() + file.originalname).split(" ").join(""));
    },
});

const upload = multer({ storage: storage });


dataRouter.patch("/updateImages/:id", upload.array('image', 10), async (req, res) => {
    const { id } = req.params;
    const images = req.files.map((file) => ({
        pic: file.filename,
        action: false,
    }));
    console.log(id)
    console.log(images)
    try {
        await dataModal.findByIdAndUpdate({ _id: id }, { images })
        res.send("image is added")
    }
    catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.patch("/deleteImages/:id", async (req, res) => {
    const { id } = req.params;
    // const images = req.files.map((file) => ({
    //     pic: file.filename,
    //     action:false,
    //   }));
    console.log(id)
    console.log(req.body)
    try {
        await dataModal.findByIdAndUpdate({ _id: id }, req.body)
        res.send("image is added")
    }
    catch (err) {
        res.send({ "err": err.message })
    }
})

dataRouter.delete("/deleteData/:id", async (req, res) => {
    const { id } = req.params;
    console.log(id)
    // console.log(req.body,"body/....../")
    try {
        await dataModal.deleteMany({ projectID: id })
        res.send("data is delete")
    } catch (err) {
        res.send({ "err": err.message })
    }
})

module.exports = { dataRouter }