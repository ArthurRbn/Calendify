import {Appointment, AppointmentType} from '../models/appointment.model';

export class AppointmentService {
    async createAppointment(appointmentData: { title: string; type: AppointmentType; location?: string; startTime: Date; endTime: Date; vendorId: number; buyerId: number; }) {
        return await Appointment.create(appointmentData);
    }

    async updateAppointment(id: number, appointmentData: Partial<{ title: string; type: AppointmentType; location?: string; startTime: Date; endTime: Date; buyerId: number; }>) {
        return await Appointment.update(appointmentData, { where: { id } });
    }

    async deleteAppointment(id: number) {
        return await Appointment.destroy({ where: { id } });
    }

    async getAppointments() {
        return await Appointment.findAll();
    }
}
