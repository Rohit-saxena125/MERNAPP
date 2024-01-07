if (process.env.NODE_ENV != "production") {

    require("dotenv").config({ path: "../.env" })
}
const connectdb = require("./db/conn");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const rout = require("./Routes/auth-route");
const contactroute = require("./Routes/contact-route");
const data = require("./Routes/service-route");
const admin = require("./Routes/admin-route");
const errormiddleware = require("./middleware/errormiddleware");
app.use(cors(
    {
        origin: "http://localhost:3003",
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true,
    }
));
app.use(express.json()); 
app.use('/api/v2', rout);
app.use('/api/form',contactroute);
app.use('/api/data',data);
app.use('/api/admin',admin);
app.use(errormiddleware);
connectdb().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
}).catch((err) => {
    console.log(err.message);
    exit(1);
});