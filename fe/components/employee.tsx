import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import Image from 'next/image';
import { Employee } from '../types/employee';
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../gql/mutations';
import { GET_ALL_EMPLOYEES, GET_EMPLOYEE } from '../gql/queries';
import client from '../apollo-client';
import { ObjectID } from 'bson'

async function addEmployeeServer (e: Employee) {
  const { data } = await client.mutate({
    mutation: ADD_EMPLOYEE,
    variables: {
      avatar: "FUD",
      firstName: e.firstName,
      lastName: e.lastName,
      jobTitle: e.jobTitle,
      salary: Number(e.salary),
      department: e.department,
      location: e.location
    },
    optimisticResponse: {
      addEmployee: {
        id: "61f736233810be544a8c109e",
        avatar: 'fgdf',
        firstName: 'Pedro',
        lastName: 'Pascal',
        fullName: 'Pedro Pascal',
        jobTitle: 'CEO',
        salary: 150000,
        department: 'Board',
        location: 'Los Angeles'
      },
    },
    refetchQueries: [{ query: GET_ALL_EMPLOYEES, variables: {} } ],
    update: (cache, res) => {
      cache.updateQuery({ query: GET_ALL_EMPLOYEES, variables: {} }, (data) => ({
        employees: [...data?.employees?.items, res?.data?.addEmployee]
        })
      )
    }
  })
  
  return data?.addEmployee
}

async function updateEmployee (e: Employee) {
  const { data } = await client.mutate({
    mutation: UPDATE_EMPLOYEE,
    variables: {
      id: e.id,
      avatar: e.avatar,
      firstName: e.firstName,
      lastName: e.lastName,
      jobTitle: e.jobTitle,
      salary: Number(e.salary),
      department: e.department,
      location: e.location
    },
    optimisticResponse: {
      updateEmployee: {
        id: "61f736233810be544a8c109e",
        avatar: 'fgdf',
        firstName: 'Pedro',
        lastName: 'Pascal',
        fullName: 'Pedro Pascal',
        jobTitle: 'CEO',
        salary: 150000,
        department: 'Board',
        location: 'Los Angeles'
      },
    },
    refetchQueries: [{ query: GET_ALL_EMPLOYEES, variables: {} }, { query: GET_EMPLOYEE, variables: { id: e.id }} ],
    update: (cache, res) => {
      cache.updateQuery({ query: GET_EMPLOYEE, variables: { id: e.id }}, (data) => ({
          employee: res?.data?.updateEmployee
        })
      ),
      cache.modify({
        fields: {
          employees(existingEmployeesRef, {}) {
            return existingEmployeesRef.items.filter((e: Employee) => e.id !== res?.data?.updateEmployee.id)
          }
        },
      });
    }
  })
  
  return data?.updateEmployee
}

export const AddEmployee = ({addEmployeeClient}: {addEmployeeClient:any }) => {

  const [localChanges, setLocalChanges] = useState({} as Employee);

  const handleLocalChange = (e: Employee) => {
    let updatedValue: Employee = { ...e, fullName: `${e.firstName} ${e.lastName}`, id: String(new ObjectID()) }
    setLocalChanges(updatedValue);
  }

  const reset = () => {
    setLocalChanges({} as Employee);
  }

  const submitForm = () => {
    addEmployeeServer(localChanges).then(() => addEmployeeClient(localChanges))
  }

  return <>
  <Dialog.Root>
    <Dialog.Trigger className='float-right mb-5'>
     <div className='backdrop-blur-xl bg-white/50 flex items-center p-2 rounded-lg shadow-xs'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/></svg>
      </div>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='bg-neutral-800 fixed inset-0'/>
      <Dialog.Content className='bg-white rounded-lg shadow-lg fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-md max-h-[85vh] p-6 overflow-y-scroll'>
        <Dialog.Title className='flex justify-between font-bold text-neutral-800 text-lg'>
        Add Employee
          <Dialog.Close asChild className='cursor-pointer self-start place-self-end'>
            <button onClick={() => reset()}>
              <svg fill="url(#gradient-horizontal) #60a5fa;" className='close-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
              <linearGradient id="gradient-horizontal">
                <stop offset="0%" stopColor="var(--color-stop-1)" />
                <stop offset="50%" stopColor="var(--color-stop-2)" />
                <stop offset="100%" stopColor="var(--color-stop-3)" />
              </linearGradient>
                <path fill="transparent" d="M0 0h24v24H0z"/>
                <path fill="url(#gradient-horizontal) #60a5fa" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
              </svg>
            </button>
        </Dialog.Close>
        </Dialog.Title>
        <div className='mt-0 relative w-32 h-32 rounded-full mb-4 mx-auto'>
            <figure className=''>
              <Image src={`https://avatars.dicebear.com/api/big-ears-neutral/.svg`} alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
            </figure>
          </div>
        <Dialog.Description className='my-4 text-neutral-500 text-sm'>
          Make changes to this employees profile here.
          Click save when you're done.
        </Dialog.Description>
        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='cols-span-1'>First Name</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={`Phoebe`}
          onChange={(e) => { handleLocalChange({...localChanges, firstName: e.target.value}) }}
          type='text'
          />
        </fieldset>

        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Last Name</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={`Bridgers`}
          onChange={(e) => { handleLocalChange({...localChanges, lastName: e.target.value}) }}
          type='text'
          />
        </fieldset>

        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Job Title</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={`System Administrator`}
          onChange={(e) => { handleLocalChange({...localChanges, jobTitle: e.target.value}) }}
          type='text'
          />
        </fieldset>


        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Salary</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={`65000`}
          onChange={(e) => { handleLocalChange({...localChanges, salary: Number(e.target.value)}) }}
          type='text'
          />
        </fieldset>

        <fieldset>
        <label className=''>Department</label>
        <RadioGroup.Root
        className='flex items-center justify-between'
        aria-label="View density"
        onValueChange={(e) => { handleLocalChange({...localChanges, department: e}) }}
        >
          <div className='inline-flex items-center py-3'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Board" id="Board" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Board">Board</label>
          </div>
          <div className='inline-flex items-center'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="IT" id="IT" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="IT">IT</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="HR" id="HR" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="HR">HR</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Marketing" id="Marketing">
            <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Marketing">Marketing</label>
          </div>
        </RadioGroup.Root>

        </fieldset>

        <fieldset>
        <label className=''>Location</label>
        <RadioGroup.Root
        className='flex items-center justify-between'
        aria-label="View density"
        onValueChange={(e) => { handleLocalChange({...localChanges, location: e}) }}
        >
          <div className='inline-flex items-center py-3'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Los Angeles" id="Los Angeles">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Los Angeles">Los Angeles</label>
          </div>
          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="New York" id="New York">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="New York">New York</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Miami" id="Miami">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Miami">Miami</label>
          </div>
        </RadioGroup.Root>

        </fieldset>

        <Dialog.Close className='mt-4' asChild>
          <button onClick={() => {submitForm()}} className='float-right text-white bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 px-4 py-2 rounded-lg'>
            Save Changes
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  </>
}

export const EditEmployee = ({setUpdatedEmployee, updatedEmployee}: {setUpdatedEmployee: any, updatedEmployee:Employee}) => {

  const [localChanges, setLocalChanges] = useState(updatedEmployee);

  const handleLocalChange = (e: Employee) => {
    let updatedValue: Employee = { ...e};
    setLocalChanges(updatedValue);
  }

  const handleParentChange = (e: Employee) => {
    let updatedValue: Employee = { ...e }
    setUpdatedEmployee(updatedValue);
  }

  const reset = () => {
    setLocalChanges(updatedEmployee);
  }
  
  const submitForm = () => {
    updateEmployee(localChanges).then(() => handleParentChange(localChanges))
  }

  return <>
  <Dialog.Root>
    <Dialog.Trigger className='mt-2 text-white bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 px-4 py-2 rounded-lg font-semibold'>
      Edit Employee
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='bg-neutral-800 fixed inset-0'/>
      <Dialog.Content className='bg-white rounded-lg shadow-lg fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[90vw] max-w-md max-h-[85vh] p-6 overflow-y-scroll'>
        <Dialog.Title className='flex justify-between font-bold text-neutral-800 text-lg'>
        Edit Employee
          <Dialog.Close asChild className='cursor-pointer self-start place-self-end'>
            <button onClick={() => reset()}>
              <svg fill="url(#gradient-horizontal) #60a5fa;" className='close-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
              <linearGradient id="gradient-horizontal">
                <stop offset="0%" stopColor="var(--color-stop-1)" />
                <stop offset="50%" stopColor="var(--color-stop-2)" />
                <stop offset="100%" stopColor="var(--color-stop-3)" />
              </linearGradient>
                <path fill="transparent" d="M0 0h24v24H0z"/>
                <path fill="url(#gradient-horizontal) #60a5fa" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
              </svg>
            </button>
        </Dialog.Close>
        </Dialog.Title>
        <div className='mt-0 relative w-32 h-32 rounded-full mb-4 mx-auto'>
            <figure className=''>
              <Image src={`https://avatars.dicebear.com/api/big-ears-neutral/${localChanges.id}.svg`} alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
            </figure>
          </div>
        <Dialog.Description className='my-4 text-neutral-500 text-sm'>
          Make changes to this employees profile here.
          Click save when you're done.
        </Dialog.Description>
        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='cols-span-1'>First Name</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={localChanges.firstName}
          onChange={(e) => { handleLocalChange({...localChanges, firstName: e.target.value}) }}
          type='text'
          />
        </fieldset>

        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Last Name</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={localChanges.lastName}
          onChange={(e) => { handleLocalChange({...localChanges, lastName: e.target.value}) }}
          type='text'
          />
        </fieldset>

        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Job Title</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={localChanges.jobTitle}
          onChange={(e) => { handleLocalChange({...localChanges, jobTitle: e.target.value}) }}
          type='text'
          />
        </fieldset>


        <fieldset className='grid grid-cols-3 items-center mb-10 '>
          <label className='col-span-1'>Salary</label>
          <input
          className='col-span-2 w-full flex-1 inline-flex items-center justify-center rounded-md px-4 py-1 ring ring-2 ring-neutral-400'
          placeholder={`${localChanges.salary}`}
          onChange={(e) => { handleLocalChange({...localChanges, salary: Number(e.target.value)}) }}
          type='text'
          />
        </fieldset>

        <fieldset>
        <label className=''>Department</label>
        <RadioGroup.Root
        className='flex items-center justify-between'
        defaultValue={localChanges.department}
        aria-label="View density"
        onValueChange={(e) => { handleLocalChange({...localChanges, department: e}) }}
        >
          <div className='inline-flex items-center py-3'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Board" id="Board" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Board">Board</label>
          </div>
          <div className='inline-flex items-center'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="IT" id="IT" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="IT">IT</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item
          className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="HR" id="HR" >
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="HR">HR</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Marketing" id="Marketing">
            <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Marketing">Marketing</label>
          </div>
        </RadioGroup.Root>

        </fieldset>

        <fieldset>
        <label className=''>Location</label>
        <RadioGroup.Root
        className='flex items-center justify-between'
        defaultValue={localChanges.location}
        aria-label="View density"
        onValueChange={(e) => { handleLocalChange({...localChanges, location: e}) }}
        >
          <div className='inline-flex items-center py-3'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Los Angeles" id="Los Angeles">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="Los Angeles">Los Angeles</label>
          </div>
          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="New York" id="New York">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="New York">New York</label>
          </div>

          <div className='inline-flex items-center'>
          <RadioGroup.Item className='bg-white ring ring-2 ring-neutral-500 w-6 h-6 rounded-full shadow-md' value="Miami" id="r6">
          <RadioGroup.Indicator className='flex items-center justify-center w-full h-full relative after:content-[""] after:block after:h-3 after:w-3 after:rounded-full after:bg-violet-400'/>
          </RadioGroup.Item>
          <label className='text-neutral-700 font-medium text-md select-none pl-4' htmlFor="r6">Miami</label>
          </div>
        </RadioGroup.Root>

        </fieldset>



        <Dialog.Close className='mt-4' asChild>
          <button onClick={submitForm} className='float-right text-white bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 px-4 py-2 rounded-lg'>
            Save Changes
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  </>
}

export default EditEmployee;