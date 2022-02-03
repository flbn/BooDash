import * as yup from 'yup'

export const CompanyValidation = yup.object().shape({
  name: yup.string().trim().required('Company must have a name'),
  description: yup.string().trim().required('Company must have a description'),
  employees: yup.array(),
  // .unique((e) => e)
  // .required('Company must have employees'),
})
