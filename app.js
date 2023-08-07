const express = require("express");
const app = express();

const PORT =process.env.PORT || 5000;
const { default: mongoose } = require("mongoose");

// convert string into jason
app.use(express.json())

// this is middleware like security guard if have a token then u can enter next page
// app.use((req,res,next)=>{
//   console.log("http method :-" + req.method + " , URL:-" + req.url);
//   next();
// });



// all routes directory
const userRouter = require("./routes/userRoutes");
const notRouter = require("./routes/noteRoutes");

//middleware routes
app.use("/users",userRouter)
app.use("/note",notRouter)



// app.get("/",(req,res)=>{
//     res.send("hi im live");
// }) 




mongoose.connect("mongodb+srv://mohit:bvhHMq7iQdDj2VUA@apirealestate.95sauuf.mongodb.net/mohit?retryWrites=true&w=majority")
.then(()=>{
    app.listen(PORT,()=>{
       console.log(`${PORT} yes im connect`)
         });
})
.catch((error)=> {
         console.log(error);
    })

