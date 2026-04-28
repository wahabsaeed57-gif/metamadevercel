import express from "express";
import cors from "cors";
import  AuthRouter from "./routes/Auth.route.js"
import doctorRouter from "./routes/doctor.route.js"

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(express.urlencoded({ extended: true, limit: "10kb" }));
// app.use(express.json());
// app.use(express.static("public"));
// app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("this is defult route of backend developemrnt ");
});
// import routess
app.use("/metamaid/user",AuthRouter)
app.use("/metamaid/doctor", doctorRouter);
 
// app.use("/user", userRoute);
export default app;
