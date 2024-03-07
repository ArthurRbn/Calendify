import express from 'express';
import { createAppointment, updateAppointment, deleteAppointment, getAppointments } from '../controllers/appointment.controller';
import { authenticate } from "../middlewares/authenticate.middleware";

const router = express.Router();

router.post('/', authenticate, createAppointment);
router.put('/:id', authenticate, updateAppointment);
router.delete('/:id', authenticate, deleteAppointment);
router.get('/', authenticate, getAppointments);

export default router;
