import * as mongoose from 'mongoose'
import employeeModel, { Employee } from './employee-model'

const Schema = mongoose.Schema

export interface Company extends mongoose.Document {
  name: string
  description: string
  employees: Employee[]
}

const CompanySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  employees: [{ type: employeeModel, required: false }],
})

export default mongoose.model<Company>('Company', CompanySchema)
