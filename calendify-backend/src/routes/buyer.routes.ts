import express from 'express';
import {createBuyer, deleteBuyer, getBuyers} from '../controllers/buyer.controller';
import {authenticate} from "../middlewares/authenticate.middleware";

const router = express.Router();

router.get('/', authenticate, getBuyers);
router.post('/', authenticate, createBuyer);
router.delete('/:id', authenticate, deleteBuyer);

export default router;
