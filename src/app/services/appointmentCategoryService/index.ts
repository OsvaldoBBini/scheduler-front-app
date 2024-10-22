import { CreateAppointmentCategory } from "./createAppointmentCategory";
import { showAppointmentCategory } from "./showAppointmentCategory";
import { updateAppointmentCategory } from "./updateAppointmentCategory";


export const appointmentCategoryService = {
  create: CreateAppointmentCategory,
  show: showAppointmentCategory,
  update: updateAppointmentCategory
}