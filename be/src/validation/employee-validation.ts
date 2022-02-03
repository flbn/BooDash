import * as yup from 'yup'

export const EmployeeValidation = yup.object().shape({
  avatar: yup.string().trim().required('Employee must have a profile picture'),
  firstName: yup.string().trim().required('Employee must have a first name'),
  lastName: yup.string().trim().required('Employee must have a last name'),
  jobTitle: yup
    .string()
    .trim()
    // .isJobTitle()
    .required('Employee must have a job title'),
  salary: yup.number().required('Employee must have a salary'),
  department: yup
    .string()
    .trim()
    // .isDepartment()
    .required('Employee must have a department'),
  location: yup
    .string()
    .trim()
    // .isLocation()
    .required('Employee must have a location'),
})
