import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';

const appointmentService = new AppointmentService();

export async function createAppointment(req: Request, res: Response) {
    try {
        const appointment = await appointmentService.createAppointment({ ...req.body, vendorId: req.body.vendorId });
        res.status(201).json(appointment);
    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateAppointment(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await appointmentService.updateAppointment(id, req.body);
        res.status(200).send();
    } catch (error) {
        console.error('Appointment update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteAppointment(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await appointmentService.deleteAppointment(id);
        res.status(204).send();
    } catch (error) {
        console.error('Appointment deletion error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getAppointments(req: Request, res: Response) {
    try {
        const appointments = await appointmentService.getAppointments();
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Fetching appointments error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
