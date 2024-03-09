import { Request, Response } from 'express';
import { VendorService } from '../services/vendor.service';

const vendorService = new VendorService();

export async function registerVendor(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        if (await vendorService.usernameAvaialable(username) === false) {
            return res.status(409).json({ error: 'User already exists.' });
        }
        const newVendor = await vendorService.createVendor(username, password);
        const token = vendorService.generateToken(newVendor.id!);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function loginVendor(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await vendorService.validateVendor(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = vendorService.generateToken(user.id!);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const validateVendorToken = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Token is valid' });
};
