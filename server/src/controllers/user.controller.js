import db from "../index.js";
import { usersTable } from '../db/schema.js';
import { hashedPasswordWithSalt } from '../utils/hash.js';
import { getUserByEmail } from '../services/user.services.js';
import { createUserToken } from '../utils/token.js';

export async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ error: 'Name, email, and password must be strings' });
        }

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(400).json({ error: `User with ${email} already registered!` });
        }
        
        const { salt, password: hashedPassword } = hashedPasswordWithSalt(password);
        
        
          const [newUser] = await db
            .insert(usersTable)
            .values({
                name,
                email,
                password: hashedPassword,
                salt,
            })
            .returning({ id: usersTable.id });

        
        return res.status(201).json({ data: { userId: newUser.id } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: `User with ${email} not found!` });
        }

        const { password: hashedPassword } = hashedPasswordWithSalt(password, user.salt);

        if (user.password !== hashedPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = await createUserToken({ id: user.id });

        return res.json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}