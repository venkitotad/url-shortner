import db from '../index.js';
import { usersTable } from '../db/schema.js';
import { hashedPasswordWithSalt } from '../utils/hash.js';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email){
       const [existingUser] = await db
      .select({ 
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        salt: usersTable.salt,
        password:usersTable.password
       })
      .from(usersTable)
      .where(eq(usersTable.email, email));
      

    return existingUser;
}