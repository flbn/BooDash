import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql'

export const SumType = new GraphQLObjectType({
  name: 'Sum',
  fields: () => ({
    _id: { type: GraphQLID },
    sum: { type: new GraphQLNonNull(GraphQLInt) },
  }),
})

export const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: () => ({
    id: { type: GraphQLID },
    avatar: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    jobTitle: { type: GraphQLString },
    salary: { type: GraphQLInt },
    department: { type: GraphQLString },
    location: { type: GraphQLString },
  }),
})
