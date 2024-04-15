import bcrypt from 'bcrypt';
import { Vendor } from '../models/vendor.model';
import jwt from 'jsonwebtoken';

export class VendorService {
    async usernameAvaialable(username: string) {
        const user = await Vendor.findOne({ where: { username } });
        return user === null;
    }

    async createVendor(username: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await Vendor.create({username, password: hashedPassword});
    }

    async validateVendor(username: string, password: string) {
        const user = await Vendor.findOne({ where: { username } });
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
