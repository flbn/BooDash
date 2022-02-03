import * as chai from 'chai'
import * as request from 'supertest'
import app from '../index'
import { clearDB, createEmployee } from './index'
import { Employee as EmployeeType } from '../models/employee-model'
import {
  getEmployeeQuery,
  getAllEmployeesQuery,
  getAllEmployeeCountQuery,
  getAllEmployeeSalarySumQuery,
  getAllEmployeesSortedQuery,
} from './test-queries'
import {
  updateEmployeeMutation,
  deleteEmployeeMutation,
} from './test-mutations'

const expect = chai.expect

describe('Employee', () => {
  beforeEach(clearDB)

  describe('QUERY Employee', () => {
    let employee: EmployeeType | undefined
    let server: request.SuperTest<request.Test>
    beforeEach(async () => {
      server = request(app)
      employee = await createEmployee()
    })

    it('should get a specific employee', (done) => {
      server
        .post('/graphql')
        .send({ query: getEmployeeQuery(employee?.id) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.employee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.employee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.employee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.employee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.employee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.employee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should not get an nonexistent employee (incorrect ID)', (done) => {
      server
        .post('/graphql')
        .send({ query: getEmployeeQuery('obviouslyWrong') })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employee).to.be.null

          done()
        })
    })

    it('should get all employees (paginated)', (done) => {
      server
        .post('/graphql')
        .send({ query: getAllEmployeesQuery(10, 0) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          const randomEmployee = Math.floor(
            Math.random() * res.body.data.employees.items.length
          )

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees.items)
            .to.be.an('array')
            .to.have.length(1)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should get all employees (default limit and offset)', (done) => {
      server
        .post('/graphql')
        .send({ query: getAllEmployeesQuery(null, null) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          const randomEmployee = Math.floor(
            Math.random() * res.body.data.employees.items.length
          )

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees.items)
            .to.be.an('array')
            .to.have.length(1)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.employees.items[randomEmployee])
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should get count of all employees', (done) => {
      server
        .post('/graphql')
        .send({ query: getAllEmployeeCountQuery(null, null) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees).to.haveOwnProperty('count')
          expect(res.body.data.employees.count).to.be.a('number')

          done()
        })
    })

    it('should get the sum of all employee salaries', (done) => {
      server
        .post('/graphql')
        .send({ query: getAllEmployeeSalarySumQuery(null, null) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees).to.haveOwnProperty('sumSalary')
          expect(res.body.data.employees.sumSalary).to.be.an('array')
          expect(res.body.data.employees.sumSalary[0].sum).to.be.a('number')

          done()
        })
    })

    it('should get all sorted employees (default limit and offset)', (done) => {
      server
        .post('/graphql')
        .send({
          query: getAllEmployeesSortedQuery('salary', 1, null, null),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          const randomEmployee = Math.floor(
            Math.random() * res.body.data.employees.sort.length
          )

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees.sort)
            .to.be.an('array')
            .to.have.length(1)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should get all sorted employees (paginated)', (done) => {
      server
        .post('/graphql')
        .send({ query: getAllEmployeesSortedQuery('salary', 1, 10, 0) })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            return done(err)
          }

          const randomEmployee = Math.floor(
            Math.random() * res.body.data.employees.sort.length
          )

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.employees).to.be.an('object')
          expect(res.body.data.employees.sort)
            .to.be.an('array')
            .to.have.length(1)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.employees.sort[randomEmployee])
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    after(clearDB)
  })

  describe('MUTATION Employee', () => {
    let employee: EmployeeType | undefined
    let server: request.SuperTest<request.Test>
    beforeEach(async () => {
      server = request(app)
      employee = await createEmployee()
    })

    it('should change an employees first name', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            'obviousChange',
            employee?.lastName,
            employee?.jobTitle,
            employee?.salary,
            employee?.department,
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal('obviousChange')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`obviousChange ${employee?.lastName}`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should change an employees last name', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            'obviousChange',
            employee?.jobTitle,
            employee?.salary,
            employee?.department,
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal('obviousChange')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} obviousChange`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should change an employees job title', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            employee?.lastName,
            'obviousChange',
            employee?.salary,
            employee?.department,
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} ${employee?.lastName}`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal('obviousChange')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should change an employees salary', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            employee?.lastName,
            employee?.jobTitle,
            75000,
            employee?.department,
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} ${employee?.lastName}`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(75000)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should change an employees department', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            employee?.lastName,
            employee?.jobTitle,
            employee?.salary,
            'obviousChange',
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} ${employee?.lastName}`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal('obviousChange')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    it('should change an employees location', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            employee?.lastName,
            employee?.jobTitle,
            employee?.salary,
            employee?.department,
            'obviousChange'
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} ${employee?.lastName}`)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal('obviousChange')

          done()
        })
    })

    it('should change everything about an employee', (done) => {
      server
        .post('/graphql')
        .send({
          query: updateEmployeeMutation(
            employee?.id,
            employee?.avatar,
            'obviousChangeFirstName',
            'obviousChangeLastName',
            'obviousChangeJobTitle',
            75000,
            'obviousChangeDepartment',
            'obviousChangeLocation'
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.updateEmployee).to.be.an('object')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('firstName')
            .equal('obviousChangeFirstName')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('lastName')
            .equal('obviousChangeLastName')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('fullName')
            .equal('obviousChangeFirstName obviousChangeLastName')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal('obviousChangeJobTitle')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('salary')
            .equal(75000)
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('department')
            .equal('obviousChangeDepartment')
          expect(res.body.data.updateEmployee)
            .to.haveOwnProperty('location')
            .equal('obviousChangeLocation')

          done()
        })
    })

    it('should delete an employee', (done) => {
      server
        .post('/graphql')
        .send({
          query: deleteEmployeeMutation(
            employee?.id,
            employee?.avatar,
            employee?.firstName,
            employee?.lastName,
            employee?.jobTitle,
            employee?.salary,
            employee?.department,
            employee?.location
          ),
        })
        .expect(200)
        .end((err: any, res: any) => {
          if (err) {
            console.log(res)
            return done(err)
          }

          expect(res.body).to.be.an('object')
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.deleteEmployee).to.be.an('object')
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('id')
            .equal(employee?.id)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('firstName')
            .equal(employee?.firstName)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('lastName')
            .equal(employee?.lastName)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('fullName')
            .equal(`${employee?.firstName} ${employee?.lastName}`)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('jobTitle')
            .equal(employee?.jobTitle)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('salary')
            .equal(employee?.salary)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('department')
            .equal(employee?.department)
          expect(res.body.data.deleteEmployee)
            .to.haveOwnProperty('location')
            .equal(employee?.location)

          done()
        })
    })

    after(clearDB)
  })
})
