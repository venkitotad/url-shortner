import express from 'express';
import db from '../index.js';
import { nanoid } from 'nanoid';
import { urlTable, usersTable } from '../db/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'You must be logged in to access this!' });
    }

    const { url, code } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Please provide the URL!' });
    }

    const [result] = await db.insert(urlTable).values({
      shortCode: code ?? nanoid(6),
      targetURL: url,
      userId: req.user.id
    }).returning({
      id: urlTable.id,
      shortCode: urlTable.shortCode,
      targetURL: urlTable.targetURL
    });

    return res.status(201).json({
      id: result.id,
      shortCode: result.shortCode,
      targetURL: result.targetURL
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


router.get('/:shortCode', async (req, res) =>{
    const code = req.params.shortCode;
    const [result] = await db.select({
        targetURL: urlTable.targetURL
    }).from(urlTable).where(eq(urlTable.shortCode, code))
    
    if(!result){
        return res.status(404).json({error:`Invalid URL!.`});
    }
    
    return res.redirect(result.targetURL);
    
});


export default router;
