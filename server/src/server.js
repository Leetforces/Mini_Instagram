const express =require('express');
// import cors(cross-origin-resource-sharing)
const cors =require('cors');
const app = express();
const morgan = require('morgan');




// configure environmental variable
require('dotenv').config();
const PORT = process.env.PORT || 2000;

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
app.use('/api',routerAuth);
app.use('/api',postRoutes);



app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server is running at port ${PORT}`);
    }
})