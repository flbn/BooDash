import * as _ from 'lodash'
import Employee, { Employee as EmployeeType } from '../../models/employee-model'
import { EmployeeValidation } from '../../validation/employee-validation'
import { GraphQLError } from 'graphql'

export async function addEmployee(
  parent: any,
  args: any,
  { headers }: any
): Promise<EmployeeType | Error> {
  try {
    EmployeeValidation.validate(args)

    const employee = new Employee({
      avatar: args.avatar,
      firstName: args.firstName,
      lastName: args.lastName,
      jobTitle: args.jobTitle,
      salary: args.salary,
      department: args.department,
      location: args.location,
    })

    return await Employee.create(employee)
  } catch (err: unknown) {
    return new GraphQLError(String(err))
  }
}

export async function updateEmployee(
  parent: any,
  args: any,
  { headers }: any
): Promise<EmployeeType | Error | null> {
  try {
    await EmployeeValidation.validate(args)

    const employee = await Employee.findOne({ id: args.id })

    if (!employee) {
      throw new Error('Employee does not exists')
    }

    await Employee.findOneAndUpdate(
      { _id: args.id },
      {
        avatar: args.avatar || employee.avatar,
        firstName: args.firstName || employee.firstName,
        lastName: args.lastName || employee.lastName,
        jobTitle: args.jobTitle || employee.jobTitle,
        salary: args.salary || employee.salary,
        department: args.department || employee.department,
        location: args.location || employee.location,
      }
    )

    const updatedEmployee: EmployeeType | null = await Employee.findOne({
      id: args.id,
    })

    return updatedEmployee
  } catch (err: unknown) {
    return new GraphQLError(String(err))
  }
}

export async function deleteEmployee(
  parent: any,
  args: any,
  { headers }: any
): Promise<EmployeeType | Error | null> {
  try {
    await EmployeeValidation.validate(args)

    const employee = await Employee.findByIdAndDelete(args.id)

    return employee
  } catch (err: unknown) {
    return new GraphQLError(String(err))
  }
}
