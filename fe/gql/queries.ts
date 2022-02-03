import { gql } from "@apollo/client";


export const GET_SORTED_EMPLOYEES = gql`
query getSortedEmployees($field: String, $order: Int, $limit: Int, $offset: Int) {
  employees(pagination: {limit: $limit, offset: $offset} sort: { field: $field, order: $order }) {
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

export const GET_ALL_EMPLOYEES = gql`
query getEmployees($limit: Int, $offset: Int) {
  employees(pagination: {limit: $limit, offset: $offset}) {
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
    },
    count
    sumSalary {
      sum 
    }
  }
}
`

export const GET_EMPLOYEE = gql`
query getEmployee($id: ID) {
  employee(id: $id) {
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

