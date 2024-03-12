import express from 'express';
import { createAppointment, updateAppointment, deleteAppointment, getAppointments } from '../controllers/appointment.controller';
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.get('/', authenticate, getAppointments);
router.post('/', authenticate, createAppointment);
router.put('/:id', authenticate, updateAppointment);
router.delete('/:id', authenticate, deleteAppointment);

export default router;
