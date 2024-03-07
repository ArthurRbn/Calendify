import express from 'express';
import { createBuyer, deleteBuyer } from '../controllers/buyer.controller';
import {authenticate} from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post('/', authenticate, createBuyer);
router.delete('/:id', authenticate, deleteBuyer);

export default router;
