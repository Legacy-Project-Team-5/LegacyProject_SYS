const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const connections = require("./connections");
const router = require("./Routers/routers");
const controllers = require("./controllers/controllers")




app.use(express.json());
app.use(cors());


app.use("/",router);


app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});