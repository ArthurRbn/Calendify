import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const newUser = await userService.createUser(username, password);
        const token = userService.generateToken(newUser.id!);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await userService.validateUser(username, password);
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token = userService.generateToken(user.id!);
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
