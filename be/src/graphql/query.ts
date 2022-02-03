/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as graphql from 'graphql'
import Employee from '../models/employee-model'
import { EmployeeType, SumType } from './types'

const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql

const SortArgType = new GraphQLInputObjectType({
  name: 'SortArg',
  fields: {
    field: { type: GraphQLString, description: 'field to sort' },
    order: { type: GraphQLInt, description: 'order to sort' },
  },
})

const PaginationArgType = new GraphQLInputObjectType({
  name: 'PaginationArg',
  fields: {
    limit: {
      type: GraphQLInt,
      description: 'First <number> of rows after offset.',
    },
    offset: {
      type: GraphQLInt,
      description: 'Skip <number> rows.',
    },
  },
})

const PaginatedListType = (ItemType: any) =>
  new GraphQLObjectType({
    name: 'Paginated' + ItemType, // So that a new type name is generated for each item type, when we want paginated types for different types (eg. for Person, Book, etc.). Otherwise, GraphQL would complain saying that duplicate type is created when there are multiple paginated types.
    fields: {
      count: { type: GraphQLInt },
      items: { type: new GraphQLList(ItemType) },
      sumSalary: { type: new GraphQLList(SumType) },
      // sortSalaryAsc: { type: new GraphQLList(ItemType) },
      // sortSalaryDesc: { type: new GraphQLList(ItemType) },
      sort: { type: new GraphQLList(ItemType) },
    },
  })

const EmployeeQueryTypes = {
  employee: {
    type: EmployeeType,
    args: { id: { type: GraphQLID } },
    resolve(_parent: any, _args: any, { headers }: any) {
      return Employee.findById(_args.id)
    },
  },
  employees: {
    type: PaginatedListType(EmployeeType),
    args: {
      pagination: {
        type: PaginationArgType,
        defaultValue: { limit: 10, offset: 0 },
      },
      sort: { type: SortArgType, defaultValue: { field: '_id', order: 'asc' } },
    },
    resolve: (_parent: any, _args: any, { headers }: any) => {
      const { offset, limit } = _args.pagination
      const { field, order } = _args.sort
      // Call MongoDB/Mongoose functions to fetch data and count from database here.
      return {
        items: Employee.find().skip(offset).limit(limit).exec(),
        count: Employee.count(),
        sumSalary: Employee.aggregate([
          {
            $group: {
              _id: null,
              sum: { $sum: '$salary' },
            },
          },
        ]).exec(),
        sort: Employee.find()
          .sort({ [field]: [order] })
          .skip(offset)
          .limit(limit)
          .exec(),
      }
    },
  },
}

export const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...EmployeeQueryTypes,
  },
})
