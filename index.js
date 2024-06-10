// External Dependencies
const express = require('express');
const createError = require('http-errors');
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require('dotenv').config();

// Initialize DB
require('./initDB')();

// Internal Dependencies
const { dataRouter } = require("./Routes/data.routes");
const { userRouter } = require("./Routes/user.routes");
const { projectRouter } = require("./Routes/project.routes");
const { rateListRouter } = require("./Routes/ratelist.routes");
const { teamMemberRouter } = require("./Routes/teamMember.routes");
const { rolesRouter } = require("./Routes/roles.routes");
const { noteRouter } = require("./Routes/notes.routes");
const { picRouter } = require("./Routes/pic.routes");
const { masterCategoryRouter } = require("./Routes/masterCategory.routes");

const app = express();

// Settings
app.use(bodyParser.json({ limit: '900mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 1000000000, limit: '900mb'}));
app.use(cors());
app.use(express.json());

// Setting headers
app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'unloading=()');
    next();
});

// Routes
app.use("/user", userRouter);
app.use("/team", teamMemberRouter);
app.use("/project", projectRouter);
app.use("/data", dataRouter);
app.use("/rateList", rateListRouter);
app.use("/roles", rolesRouter);
app.use("/pic", picRouter);
app.use("/note", noteRouter);
app.use("/masterCategory", masterCategoryRouter);
app.use("/uploads", express.static("uploads"));

// Routes (Restructured)
const VERSION = process.env.VERSION || "v1";
const baseURI = `/api/${VERSION}`;

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
    console.log(`Server started on port ${PORT}...`)
});
