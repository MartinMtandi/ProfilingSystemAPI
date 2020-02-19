require("dotenv").config();
const express = require('express');
var cors = require('cors')
const app = express();
const userRouter = require("./api/users/userRouter");
const questionRouter = require("./api/questions/questionRouter");
const graphRouter = require('./api/graphs/graphRouter');
const accessPointRouter = require('./api/ap/accessPointRouter');
const groupRouter = require('./api/groups/groupRouter');

app.use(cors())

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/graph", graphRouter);
app.use("/api/aps", accessPointRouter);
app.use("/api/getLastQuestionGroupId", groupRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
});