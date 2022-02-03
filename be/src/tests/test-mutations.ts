export const updateEmployeeMutation = (
  id: string | undefined,
  avatar: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  jobTitle: string | undefined,
  salary: number | undefined,
  department: string | undefined,
  location: string | undefined
) => `
mutation {
    updateEmployee (
      id: "${id}",
      avatar: "${avatar}",
      firstName: "${firstName}",
      lastName: "${lastName}",
      jobTitle: "${jobTitle}",
      salary: ${salary},
      department: "${department}",
      location: "${location}"
    ) {
      id
      avatar
      firstName
      lastName
      fullName
      jobTitle
      salary
      department
      location
   }
 }
 `
export const deleteEmployeeMutation = (
  id: string | undefined,
  avatar: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  jobTitle: string | undefined,
  salary: number | undefined,
  department: string | undefined,
  location: string | undefined
) => `
mutation {
  deleteEmployee (
    id: "${id}",
    avatar: "${avatar}",
    firstName: "${firstName}",
    lastName: "${lastName}",
    jobTitle: "${jobTitle}",
    salary: ${salary},
    department: "${department}",
    location: "${location}"
  ) {
    id
    avatar
    firstName
    lastName
    fullName
    jobTitle
    salary
    department
    location
 }
}
`
