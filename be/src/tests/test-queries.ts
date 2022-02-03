export const getEmployeeQuery = (id: string | undefined) => `
{ 
  employee (id: "${id}") { 
    id 
    avatar
    firstName
    lastName
    jobTitle
    salary
    department
    location
  } 
}
`

export const getAllEmployeesQuery = (
  limit: number | null,
  offset: number | null
) => `
{ 
  employees(pagination: {limit: ${limit}, offset: ${offset}} ) {
    items {
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
}
`

export const getAllEmployeeCountQuery = (
  limit: number | null,
  offset: number | null
) => `
{ 
  employees(pagination: {limit: ${limit}, offset: ${offset}} ) {
    count
  }
}
`

export const getAllEmployeeSalarySumQuery = (
  limit: number | null,
  offset: number | null
) => `
{ 
  employees(pagination: {limit: ${limit}, offset: ${offset}} ) {
    sumSalary {
      sum 
    }
  }
}
`

export const getAllEmployeesSortedQuery = (
  field: string | null,
  order: number | null,
  limit: number | null,
  offset: number | null
) => `
{ 
  employees(pagination: {limit: ${limit}, offset: ${offset}} sort: { field: "${field}", order: ${order} }) {
    sort {
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
}
`
