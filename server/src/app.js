import express from 'express';
import userRouter from '../src/routes/user.routes.js';
import urlRouter from '../src/routes/url.routes.js';
import { authMiddleware } from './middleware/auth.middleware.js';
const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(express.json());
app.use(authMiddleware);

app.get('/', (req, res) =>{
   res.send('OK!'); 
});


app.use('/user', userRouter);
app.use(urlRouter);

app.listen(PORT, ()=>{
    console.log(`server is up ${PORT}`);
    
});