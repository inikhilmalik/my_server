const express=require("express");
const { connection } = require("./db");
const { dataRouter } = require("./routes/data.routes");
const app=express();
const cors=require("cors");
const bodyParser=require("body-parser");
const { userRouter } = require("./routes/user.routes");
const { projectRouter } = require("./routes/project.routes");
const { rateListRouter } = require("./routes/ratelist.routes");
const { teamMemberRouter } = require("./routes/teamMember.routes");
const { rolesRouter } = require("./routes/roles.routes");
const { noteRouter } = require("./routes/notes.routes");
const { picRouter } = require("./routes/pic.routes");
const { masterCategoryRouter } = require("./routes/masterCategory.routes");
const { todoRouter } = require("./routes/todos.routes");
const { noteNotificationRouter } = require("./routes/noteNotification");
const { approvalRouter } = require("./routes/approval.route");
require("dotenv").config()

const port=process.env.PORT||8080;
app.use(bodyParser.json({ limit: '900mb' }));
app.use(bodyParser.urlencoded({ extended: true,parameterLimit: 1000000000,limit: '900mb'}));
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'unloading=()');
    next();
  });

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userRouter)

app.use("/team",teamMemberRouter)

app.use("/project",projectRouter)

app.use("/data",dataRouter);

app.use("/rateList",rateListRouter);

app.use("/roles",rolesRouter);

app.use("/pic",picRouter);

app.use("/note",noteRouter);

app.use("/todo",todoRouter);

app.use("/masterCategory",masterCategoryRouter);

app.use("/noteNotification",noteNotificationRouter);
 
app.use("/approvalRequired",approvalRouter);

app.use("/uploads",express.static("uploads"))


app.listen(port,async()=>{
    try{
        await connection;
        console.log("connected to DB")
    }catch(err){
        console.log("Cannot connected to DB")
        console.log(err);
    }

    console.log(`server is running at port ${port}`)
})