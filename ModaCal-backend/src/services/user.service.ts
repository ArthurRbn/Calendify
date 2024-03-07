import bcrypt from 'bcrypt';
import {User} from '../models/user.model';
import jwt from 'jsonwebtoken';

export class UserService {
    async createUser(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({username, password: hashedPassword});
    }

    async validateUser(username: string, password: string) {
        const user = await User.findOne({ where: { username } });
        if (!user) return null;

        const match = await bcrypt.compare(password, user.password);
        return match ? user : null;
    }

    generateToken(userId: number) {
        if (!process.env.SECRET_KEY) {
            throw new Error('Missing JWT secret key in environment variables');
        }
        return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
    }
}
