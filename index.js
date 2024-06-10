// External Dependencies
const express = require('express');
const createError = require('http-errors');
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require('dotenv').config();

// Internal Dependencies
const { connection } = require("./initDB");
const { dataRouter } = require("./routes/data.routes");
const { userRouter } = require("./routes/user.routes");
const { projectRouter } = require("./routes/project.routes");
const { rateListRouter } = require("./routes/ratelist.routes");
const { teamMemberRouter } = require("./routes/teamMember.routes");
const { rolesRouter } = require("./routes/roles.routes");
const { noteRouter } = require("./routes/notes.routes");
const { picRouter } = require("./routes/pic.routes");
const { masterCategoryRouter } = require("./routes/masterCategory.routes");

const app = express();

// Settings
app.use(bodyParser.json({ limit: '900mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000000, limit: '900mb'}));
app.use(cors())
app.use(express.json())

// Setting headers
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'unloading=()');
    next();
});

app.get("/", (req, res) => {
    res.send("Homepage")
})

// Routes
app.use("/user", userRouter)
app.use("/team", teamMemberRouter)
app.use("/project", projectRouter)
app.use("/data", dataRouter);
app.use("/rateList", rateListRouter);
app.use("/roles", rolesRouter);
app.use("/pic", picRouter);
app.use("/note", noteRouter);
app.use("/masterCategory", masterCategoryRouter);
app.use("/uploads", express.static("uploads"))

// 404 handler and pass to error handler
app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message || "Internal Server Error"
        }
    });
});


// Start WS
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log("Cannot connect to DB")
        console.log(err);
    }
    console.log(`Server started on port ${PORT}...`)
})
