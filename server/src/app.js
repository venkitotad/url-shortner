import express from 'express';
import userRouter from '../src/routes/user.routes.js'
import { authMiddleware } from './middleware/auth.middleware.js';
const app = express();

const port = 4000;

app.use(express.json());
app.use(authMiddleware);

app.get('/', (req, res) =>{
   res.send('OK!'); 
});

app.use('/user', userRouter);

app.listen(port, ()=>{
    console.log(`server is up ${port}`);
    
});