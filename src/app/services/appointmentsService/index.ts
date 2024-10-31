import { createAppointment } from "./createAppointment";
import { deleteAppointment } from "./deleteAppointment";
import { showAppointment } from "./showAppointments";
import { updateAppointment } from "./updateAppointment";

export const appointmentService = {
  create: createAppointment,
  show: showAppointment,
  delete: deleteAppointment,
  update: updateAppointment
}