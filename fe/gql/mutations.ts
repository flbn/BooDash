import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
mutation addEmployee(
  $avatar: String,
  $firstName: String,
  $lastName: String,
  $jobTitle: String,
  $salary: Int,
  $department: String,
  $location: String
  ) {
    addEmployee(
      avatar: $avatar,
      firstName: $firstName,
      lastName: $lastName,
      jobTitle: $jobTitle,
      salary: $salary,
      department: $department,
      location: $location
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

export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee(
  $id: ID,
  $avatar: String,
  $firstName: String,
  $lastName: String,
  $jobTitle: String,
  $salary: Int,
  $department: String,
  $location: String
  ) {
    deleteEmployee(
      id: $id,
      avatar: $avatar,
      firstName: $firstName,
      lastName: $lastName,
      jobTitle: $jobTitle,
      salary: $salary,
      department: $department,
      location: $location
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

export const UPDATE_EMPLOYEE = gql`
 mutation updateEmployee(
    $id: ID,
    $avatar: String,
    $firstName: String,
    $lastName: String,
    $jobTitle: String,
    $salary: Int,
    $department: String,
    $location: String
    ) {
      updateEmployee (
        id: $id,
        avatar: $avatar,
        firstName: $firstName,
        lastName: $lastName,
        jobTitle: $jobTitle,
        salary: $salary,
        department: $department,
        location: $location
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