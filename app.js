require("dotenv").config();

//security packages
const helmet = require("helmet");
const cor = require("cors");
const xss = require("xss-clean");
const ratelimiter = require("express-rate-limit");


const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const connectDB = require("./db/connection");
const auththenticateuser = require("./middleware/auth");

const AuthRouter = require("./routes/authRoute");
const JobRouter = require("./routes/jobRoute");

app.use(express.json());
app.use(helmet());
app.use(cor());
app.set('trust proxy', 1)
app.use(ratelimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
);

app.use(express.static("./public"));


app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/jobs", auththenticateuser, JobRouter);

const start = async () => {

    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is running on port no. ${port}`)
        });

    }
    catch (error) {
        console.log(error);
    }
}
start();

