export interface CourseFormData {
  name: string
  whatsappNumber: string
  course: string
  classType: string
  transactionNumber: string
}

import { submitCourseForm } from './form-submission'

export const submitFormData = submitCourseForm
