import { CreateAppointmentCategory } from "./createAppointmentCategory";
import { deleteAppointmentCategory } from "./deleteAppointmentCategory";
import { showAppointmentCategory } from "./showAppointmentCategory";
import { updateAppointmentCategory } from "./updateAppointmentCategory";


export const appointmentCategoryService = {
  create: CreateAppointmentCategory,
  show: showAppointmentCategory,
  update: updateAppointmentCategory,
  delete: deleteAppointmentCategory
}