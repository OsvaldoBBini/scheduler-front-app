import { createAppointment } from "./createAppointment";
import { showAppointment } from "./showAppointments";

export const appointmentService = {
  create: createAppointment,
  show: showAppointment
}