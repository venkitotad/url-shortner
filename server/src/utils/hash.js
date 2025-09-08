import {randomBytes, createHmac} from 'crypto';

export function hashedPasswordWithSalt(password, Usersalt = undefined) {
  const salt = Usersalt ?? randomBytes(256).toString('hex'); 
  const hashedPassword = createHmac('sha256', salt)
    .update(String(password))
    .digest('hex');

  return { salt, password: hashedPassword };
}
