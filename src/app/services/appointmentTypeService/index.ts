import { createAppointmentType } from "./createAppointmentType";
import { showAppointmentType } from "./showAppointmentType";
import { updateAppointmentType } from "./updateAppointmentType";


export const appointmentTypeService = {
  create: createAppointmentType,
  show: showAppointmentType,
  update: updateAppointmentType
}