import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} from 'graphql'

import { EmployeeType } from './types'
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from './resolver/employee-resolver'

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEmployee: {
      type: EmployeeType,
      args: {
        avatar: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        salary: { type: GraphQLInt },
        department: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      resolve: addEmployee,
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        avatar: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        salary: { type: GraphQLInt },
        department: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      resolve: updateEmployee,
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: GraphQLID },
        avatar: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        jobTitle: { type: GraphQLString },
        salary: { type: GraphQLInt },
        department: { type: GraphQLString },
        location: { type: GraphQLString },
      },
      resolve: deleteEmployee,
    },
  },
})
