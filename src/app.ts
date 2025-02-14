import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import router from './Routes/common.routes.js';


const app = express();
connectDB();
dotenv.config()
app.use(express.json());


app.use('/api', router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

