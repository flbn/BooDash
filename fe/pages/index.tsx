import { useState, useEffect } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import client from "../apollo-client";
import { GET_ALL_EMPLOYEES, GET_SORTED_EMPLOYEES} from '../gql/queries'
import { Employee } from '../types/employee';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { EmployeesTable } from '../components/employees';
import { Pagination } from '../components/pagination';
import { AddEmployee } from '../components/employee';


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query({
    query: GET_ALL_EMPLOYEES,
    variables: {
      limit: 10,
      offset: 0
    },
  });


  return {
    props: {
      count: data?.employees?.count,
      employees: data?.employees?.items,
      salaries: data?.employees?.sumSalary[0]?.sum,
    },
 };
}

const fetchNewEmployees = async (currentPage: any) => {
  const { data } = await client.query({
    query: GET_ALL_EMPLOYEES,
    variables: {
      limit: 10,
      offset: (currentPage - 1) * 10
    },
  })

  return data?.employees?.items
}

const paginate = (currentPage: any, setCurrentPage: any, page: number ) => {
  setCurrentPage(page)
}

const sortEmployees = async (currentPage: any, field: string, order: number) => {
  const { data } = await client.query({
    query: GET_SORTED_EMPLOYEES,
    variables: {
      field: field,
      order: order,
      limit: 10,
      offset: (currentPage - 1) * 10
    },
  })

  console.log(data?.employees?.sort)

  return data?.employees?.sort
}

const Home: NextPage = ({employees, count, salaries}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [clientEmployeesRef, setClientEmployeesRef] = useState(employees);
  const [clientSalaryRef, setClientSalaryRef] = useState(salaries)
  const [sorting, setSorting] = useState(false)
  const [field, setField] = useState(() => 'Employee')
  const [order, setOrder] = useState(() => 1)
  
  const addEmployee = (e: Employee) => {
    alert(`${e.firstName} ${e.lastName} has been added!`)
    setClientEmployeesRef([...clientEmployeesRef, e])
  }

  useEffect(() => {
    if(!sorting) {
      fetchNewEmployees(currentPage)
      .then((res) => { setClientEmployeesRef(res) })
    }
  }, [currentPage])

  useEffect(() => {
    if(sorting) {
      sortEmployees(currentPage, field, order)
      .then((res) => { setClientEmployeesRef(res) })
    }
  }, [field, order, currentPage])

  useEffect(() => {
    setOrder(1)
  }, [field])

  const sort = (field: string) => {
    setSorting(true)
    setField(field)
    setCurrentPage(1)
    setOrder(order * -1)
  }

  const unsort = () => {
    setSorting(false)
    setClientEmployeesRef(employees)
    setField('Employee')
    setOrder(1)
  }


  return <>
    <div className="">
      <Head>
        <title>Boo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 w-full py-4 px-4'>
        <h2 className='my-6 text-3xl font-semibold text-gray-900'>Employee Directory</h2>

        <a href="https://github.com/flbn" className='bg-blue-400 rounded-lg shadow-xs text-neutral-100 flex flex-cols justify-between items-center px-4 p-2 mb-4 hover:'>
          <div className=''>
            <svg className='inline-block fill-neutral-100' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"/></svg>
            <p className='ml-5 inline align-middle font-semibold'>View Source</p>
          </div>
          <p className='font-bold text-xl'>&rarr;</p>
        </a>

        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div className='backdrop-blur-xl bg-white/50 flex items-center p-4 rounded-lg shadow-xs'>
            <div className='p-3 mr-4 bg-orange-500 text-orange-100 rounded-full'>
              <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.5 2a4.5 4.5 0 0 1 2.951 7.897c.355.967.549 2.013.549 3.103A9 9 0 1 1 3.55 9.897a4.5 4.5 0 1 1 6.791-5.744 9.05 9.05 0 0 1 3.32 0A4.494 4.494 0 0 1 17.5 2zm0 2c-.823 0-1.575.4-2.038 1.052l-.095.144-.718 1.176-1.355-.253a7.05 7.05 0 0 0-2.267-.052l-.316.052-1.356.255-.72-1.176A2.5 2.5 0 1 0 4.73 8.265l.131.123 1.041.904-.475 1.295A7 7 0 1 0 19 13c0-.716-.107-1.416-.314-2.083l-.112-.33-.475-1.295 1.04-.904A2.5 2.5 0 0 0 17.5 4zM10 13a2 2 0 1 0 4 0h2a4 4 0 1 1-8 0h2z"/></svg>
            </div>

            <div>
              <p className='mb-2 text-sm font-medium text-neutral-500'>Total Employees</p>
              <p className='text-lg font-semibold text-neutral-800'>{count}</p>
            </div>
          </div>

          <div className='backdrop-blur-xl bg-white/50 flex items-center p-4 rounded-lg shadow-xs'>
            <div className='p-3 mr-4 bg-blue-500 text-blue-100 rounded-full'>
              <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm4.5 9H14a.5.5 0 1 0 0-1h-4a2.5 2.5 0 1 1 0-5h1V6h2v2h2.5v2H10a.5.5 0 1 0 0 1h4a2.5 2.5 0 1 1 0 5h-1v2h-2v-2H8.5v-2z"/></svg>
            </div>

            <div>
              <p className='mb-2 text-sm font-medium text-neutral-500'>Total Salaries</p>
              <p className='text-lg font-semibold text-neutral-800'>$ {clientSalaryRef.toLocaleString('en-US') }</p>
            </div>
          </div>

        </div>

        <AddEmployee addEmployeeClient={addEmployee}/> 


        <div className="min-w-full mt-5 overflow-x-scroll rounded-t-lg">
        <table className='min-w-full whitespace-no-wrap border-collapse'>
        <thead className=''>
          <tr className='rounded-tl-lg rounded-tr-lg text-xs font-semibold tracking-wide text-left backdrop-blur-xl bg-white/60 text-slate-500 uppercase border-b border-neutral-300/60'>
            <th className='px-4 py-3 rounded-tl-lg'>
              <button onClick={() => unsort()} className={(field == 'Employee') ? 'uppercase text-black font-bold flex items-center' : 'uppercase font-bold flex items-center'}>
                Employee
              </button>
            </th>
            <th className='px-4 py-3'>
              <button onClick={() => sort('jobTitle')} className={(field == 'jobTitle') ? 'uppercase text-black font-bold flex items-center' : 'uppercase font-bold flex items-center'}>
                Job Title
                <svg className={(field == 'jobTitle') ? (order == 1) ? 'fill-black' : 'fill-black rotate-180' : 'fill-slate-500'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
              </button>
            </th>
            <th className='px-4 py-3'>
              <button onClick={() => sort('salary')} className={(field == 'salary') ? 'uppercase text-black font-bold flex items-center' : 'uppercase font-bold flex items-center'}>
                Salary
                <svg className={(field == 'salary') ? (order == 1) ? 'fill-black' : 'fill-black rotate-180' : 'fill-slate-500'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
              </button>
            </th>
            <th className='px-4 py-3'>
              <button onClick={() => sort('department')} className={(field == 'department') ? 'uppercase text-black font-bold flex items-center' : 'uppercase font-bold flex items-center'}>
                Department
                <svg className={(field == 'department') ? (order == 1) ? 'fill-black' : 'fill-black rotate-180' : 'fill-slate-500'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
              </button>
              </th>
            <th className='px-4 py-3'>
              <button onClick={() => sort('location')} className={(field == 'location') ? 'uppercase text-black font-bold flex items-center' : 'uppercase font-bold flex items-center'}>
                Location
                <svg className={(field == 'location') ? (order == 1) ? 'fill-black' : 'fill-black rotate-180' : 'fill-slate-500'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"/></svg>
              </button>
            </th>
            <th className='rounded-tr-lg'/>
          </tr>
        </thead>
          <tbody className='w-full backdrop-blur-xl bg-white/50 divide-y divide-white/40'>
            <EmployeesTable clientEmployeesRef={clientEmployeesRef} setClientEmployeesRef={setClientEmployeesRef} clientSalaryRef={clientSalaryRef} setClientSalaryRef={setClientSalaryRef}/>
          </tbody>
          </table>
        </div>

        <Pagination paginate={paginate} setCurrentPage={setCurrentPage} count={count} page={currentPage}/>

      </main>

    </div>
  </>
}

export default Home