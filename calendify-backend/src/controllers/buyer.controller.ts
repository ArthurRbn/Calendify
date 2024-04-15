import { Request, Response } from 'express';
import { BuyerService } from '../services/buyer.service';

const buyerService = new BuyerService();

export async function getBuyers(req: Request, res: Response) {
    try {
        if (req.vendorId === undefined) {
            throw new Error("Missing vendor Id.");
        }
        const buyers = await buyerService.getBuyers(req.vendorId);
        res.status(200).json(buyers);
    } catch (error) {
        console.error('Fetching buyers error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createBuyer(req: Request, res: Response) {
    try {
        if (req.vendorId === undefined) {
            throw new Error("Missing vendor Id.");
        }
        const { name, companyName } = req.body;
        const newBuyer = await buyerService.createBuyer(req.vendorId, name, companyName);
        res.status(201).json(newBuyer);
    } catch (error) {
        console.error('Buyer creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteBuyer(req: Request, res: Response) {
    try {
        if (req.vendorId === undefined) {
            throw new Error("Missing vendor Id.");
        }
        const id = parseInt(req.params.id);
        await buyerService.deleteBuyer(req.vendorId, id);
        res.status(204).send();
    } catch (error) {
        console.error('Buyer deletion error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
