const express =require('express');
// import cors(cross-origin-resource-sharing)
const cors =require('cors');
const app = express();
const morgan = require('morgan');




// configure environmental variable
require('dotenv').config();
const PORT = process.env.PORT || 5000;

//middleware
//in terminal after request: GET /api/lfjhsdhj 200 2.418 ms - 23
app.use(morgan("dev")); //development mode
app.use(cors());

// to get json data that are requested as POST 
app.use(express.json());
// database connection
require("./database/db");
// router middleware
const routerAuth =  require('./routes/auth');
const postRoutes=require('./routes/post');
const userRoutes= require('./routes/user');
app.use('/api',routerAuth);
app.use('/api',postRoutes);
app.use('/api',userRoutes);


if(process.env.NODE_ENV==='production'){
    //serve static file
    app.use(express.static("client/build"));

    const path= require('path');

    //for any other request that is not in routes
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}








app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server is running at port ${PORT}`);
    }
})