import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
/* pacotes instalados: typescript, eslint, prettier, fns-date(?), uuid

*/
const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentsRepository,
        );

        const appointment = createAppointment.execute({
            provider,
            date: parsedDate,
        });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
    // minuto 4
});

export default appointmentsRouter;
