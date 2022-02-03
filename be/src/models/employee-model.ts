import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export interface Employee extends mongoose.Document {
  id: string
  avatar: string
  firstName: string
  lastName: string
  fullName: string
  jobTitle: JobTitle
  salary: number
  department: Department
  location: Location
}

export enum JobTitle {
  CEO = 'CEO',
  CTO = 'CTO',
  CFO = 'CFO',
  Agent = 'Agent',
  Manager = 'Manager',
  SystemAdmin = 'System Admin',
  SoftwareEngineer = 'Software Engineer',
  HRAssociate = 'HR Associate',
  HRSupervisor = 'HR Supervisor',
  MarketingAssistant = 'Marketing Assistant',
  MarketingLead = 'Marketing Lead',
}

export enum Department {
  Board = 'Board',
  Talent = 'Talent',
  IT = 'IT',
  HR = 'HR',
  Marketing = 'Marketing',
}

export enum Location {
  LosAngeles = 'Los Angeles',
  NewYork = 'New York',
  Miami = 'Miami',
}

const EmployeeSchema = new Schema({
  avatar: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  salary: { type: Number, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
})

EmployeeSchema.virtual('fullName').get(function (this: Employee) {
  return `${this.firstName} ${this.lastName}`
})

EmployeeSchema.virtual('id').get(function (this: Employee) {
  return this._id.toHexString()
})

export default mongoose.model<Employee>('Employee', EmployeeSchema)
