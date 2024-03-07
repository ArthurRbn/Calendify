import { Request, Response } from 'express';
import { BuyerService } from '../services/buyer.service';

const buyerService = new BuyerService();

export async function createBuyer(req: Request, res: Response) {
    try {
        const { name, companyName } = req.body;
        const newBuyer = await buyerService.createBuyer(name, companyName);
        res.status(201).json(newBuyer);
    } catch (error) {
        console.error('Buyer creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteBuyer(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await buyerService.deleteBuyer(id);
        res.status(204).send();
    } catch (error) {
        console.error('Buyer deletion error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
