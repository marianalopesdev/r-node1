import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate) {
            throw Error('occupied');
            //  return response.status(400).json({ message: 'occupied' });
        }

        // const appointment = appointmentsRepository.create(provider, parsedDate);
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
