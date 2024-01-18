const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());
const useRouteImpresora3d = require("./routes/impresora3d");
const useRouteRepuesto = require("./routes/repuesto");
const useRouteFilamento = require("./routes/filamento");

mongoose.set("strictQuery",false); 

async function main(){
    await mongoose.connect(process.env.MONGO_CNN);
    console.log("Base de datos conectada");
}

main().catch(err => console.log(err));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/impresora3d",useRouteImpresora3d);
app.use("/repuesto",useRouteRepuesto);
app.use("/filamento",useRouteFilamento);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`El servidor está escuchando por el puerto ${PORT}`);
})