import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import client from "../apollo-client";
import Image from 'next/image'
import { Employee } from '../types/employee';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { GET_ALL_EMPLOYEES } from '../gql/queries'
import { DELETE_EMPLOYEE } from '../gql/mutations'

type Skelton = {
  id: number
}

const QUERY = gql`
  query {
    employees {
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
`;

async function deleteEmployee (e: Employee) {

  const { data } = await client.mutate({
    mutation: DELETE_EMPLOYEE,
    variables: {
      id: e.id,
      avatar: e.avatar,
      firstName: e.firstName,
      lastName: e.lastName,
      jobTitle: e.jobTitle,
      salary: e.salary,
      department: e.department,
      location: e.location
    },
    optimisticResponse: {
      deleteEmployee: {
        id: "61f736233810be544a8c109e",
        avatar: 'fgdf',
        firstName: 'Pedro',
        lastName: 'Pascal',
        fullName: 'Pedro Pascal',
        jobTitle: 'CEO',
        salary: 150000,
        department: 'Board',
        location: 'Los Angeles',
      },
    },
    refetchQueries: [{ query: GET_ALL_EMPLOYEES, variables: {} }],
    // onQueryUpdated(observableQuery) {
    //   console.log(observableQuery)
    // },
    update: (cache, res) => {
      cache.modify({
        fields: {
          employees(existingEmployeesRef, {}) {
            return existingEmployeesRef.items.filter((e: Employee) => e.id !== res?.data?.deleteEmployee.id)
          },
        },
      });
    }
  })
  
  return data?.deleteEmployee
}

export function EmployeesTable({clientEmployeesRef, setClientEmployeesRef, clientSalaryRef, setClientSalaryRef}: {clientEmployeesRef: any, setClientEmployeesRef: any, clientSalaryRef: any, setClientSalaryRef: any}) {

  const deleteSelectedEmployee = (e: Employee) => {
    setClientEmployeesRef(clientEmployeesRef.filter((employee: Employee) => employee.id !== e.id))
    setClientSalaryRef(clientSalaryRef - e.salary)
  }

  return <>
      {clientEmployeesRef.map((e: Employee) => (
        <tr key={e.id} className='text-slate-700 w-full'>
          <td className='px-4 py-3'>
            <div className='flex items-center text-sm'>
              <figure className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                  <Image src={`https://avatars.dicebear.com/api/big-ears-neutral/${e.id}.svg`} alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
                <div className='absolute inset-0 rounded-full shadow-inner'/>
              </figure>
              <div>
                <a className='font-semibold capitalize' href={`e/${e.id}`}>{e.fullName}</a>
                <p className='text-xs text-gray-500'>{e.id}</p>
              </div>
            </div>
          </td>

          <td className='px-4 py-3 text-sm font-medium'><p className="bg-red-200 w-content inline">{e.jobTitle}</p></td>

          <td className='px-4 py-3 text-sm whitespace-nowrap font-medium'>${e.salary.toLocaleString('en-US')}</td>

          <td className='px-4 py-3 text-sm font-medium'>{e.department}</td>

          <td className='px-4 py-3 text-sm font-medium'>{e.location}</td>

          <td className="z-0">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className='px-0.5 py-0.5 rounded-full'>
              <svg className='fill-neutral-500 focus:fill-blue-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content sideOffset={5} className='bg-white min-w-[220px] rounded-lg p-3 shadow-md fading-in'>
                <DropdownMenu.Item className='text-blue-500 rounded-lg flex items-center h-8 py-0 px-2 relative pl-10 select-none border-none focus:bg-gradient-to-r focus:from-blue-500 focus:to-purple-500 focus:text-neutral-100'>
                  <a href={`/e/${e.id}`}>View Employee</a>
                </DropdownMenu.Item>

                <DropdownMenu.Separator className='h-0.5 bg-gray-300/50 my-4' />

                <DropdownMenu.Item asChild>
                    <AlertDialogPrimitive.Root>
                      <AlertDialogPrimitive.Trigger asChild>
                        <button className='w-full text-neutral-100 bg-red-500 focus:bg-red-600 rounded-lg flex items-center h-8 py-0 px-2 relative pl-10 select-none border-none'>Delete employee</button>
                      </AlertDialogPrimitive.Trigger>
                      <AlertDialogPrimitive.Portal>
                        <AlertDialogPrimitive.Content className='bg-white rounded-lg shadow-lg fixed mt-[20%] top-0 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-md max-h-[85vh] px-10 py-6'>
                          <AlertDialogPrimitive.Title className='m-0 text-neutral-800 font-bold mb-4'>Are you absolutely sure?</AlertDialogPrimitive.Title>
                          <AlertDialogPrimitive.Description className='mb-6 text-neutral-500 text-md leading-6'>
                          This action cannot be undone. This will permanently delete {e.firstName}'s employee account and remove their data from our servers.
                          </AlertDialogPrimitive.Description>
                          <div>
                            <AlertDialogPrimitive.Cancel asChild>
                              <button className='px-3 py-1 rounded-md bg-neutral-200 text-neutral-700'>
                                Cancel
                              </button>
                            </AlertDialogPrimitive.Cancel>
                            <AlertDialogPrimitive.Action asChild>
                              <button className='float-right px-3 py-1 rounded-md bg-red-500 text-white' onClick={() => { deleteEmployee(e).then(() => deleteSelectedEmployee(e) )}}>Yes, delete employee</button>
                            </AlertDialogPrimitive.Action>
                          </div>
                        </AlertDialogPrimitive.Content>
                      </AlertDialogPrimitive.Portal>
                    </AlertDialogPrimitive.Root>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </td>
      </tr>
    ))}
  </>
}

export default EmployeesTable