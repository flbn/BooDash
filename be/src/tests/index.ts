import Employee, { Employee as EmployeeType } from '../models/employee-model'

export async function clearDB(): Promise<void> {
  await Employee.deleteMany({})
}

export async function createEmployee(attrs = {}): Promise<EmployeeType> {
  const employee = new Employee({
    avatar: 'testavatar',
    firstName: 'Test',
    lastName: 'User',
    jobTitle: 'Test Title',
    salary: 99000,
    department: 'HR',
    location: 'Miami',
  })

  return employee.save()
}
