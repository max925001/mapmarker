
import {config}from 'dotenv'
config()
import app from './app.js'; 
import connectToDb from './config/database.js';


const port = process.env.PORT || 5000;
app.listen(port, async() => {
    await connectToDb()
    console.log(`Server running on port ${port}`);
});