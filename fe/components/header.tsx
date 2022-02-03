import react, {useEffect, useState} from 'react';
import { EmployeeSearch } from '../components/scroller';
import client from '../apollo-client';
import { GET_ALL_EMPLOYEES } from '../gql/queries'
import { Employee } from '../types/employee';

const getEmployees = async () => {
  const { data } = await client.query({query: GET_ALL_EMPLOYEES, variables: {}})

  return data?.employees?.items
}

export const Header = () => {
  const [query, setQuery] = useState('')
  const [employees, setEmployees] = useState([] as Employee[]);
  const [search, setSearch] = useState(null as unknown);

  useEffect(() => {
    async function originalFetch() {
      const { data } = await client.query({query: GET_ALL_EMPLOYEES, variables: {}})
      setEmployees(data?.employees?.items)
      setSearch(null)
    }
    originalFetch()
  }, [])

  useEffect(() => {
    async function searchEmployees() {
      if (employees) {
        setSearch(employees.filter((e: Employee) => e.fullName.toLowerCase().includes(query.toLowerCase())))
      }
    }

    searchEmployees()

    }, [query]);

  return <>
    <header className='bg-blue-100/90 flex justify-between items-center px-4 py-4 border-b border-neutral-100/40'>
        <a className='pr-4' href="/">
          <figure>
            <svg className='fill-blue-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2a9 9 0 0 1 9 9v7.5a3.5 3.5 0 0 1-6.39 1.976 2.999 2.999 0 0 1-5.223 0 3.5 3.5 0 0 1-6.382-1.783L3 18.499V11a9 9 0 0 1 9-9zm0 2a7 7 0 0 0-6.996 6.76L5 11v7.446l.002.138a1.5 1.5 0 0 0 2.645.88l.088-.116a2 2 0 0 1 3.393.142.999.999 0 0 0 1.74.003 2 2 0 0 1 3.296-.278l.097.13a1.5 1.5 0 0 0 2.733-.701L19 18.5V11a7 7 0 0 0-7-7zm0 8c1.105 0 2 1.12 2 2.5s-.895 2.5-2 2.5-2-1.12-2-2.5.895-2.5 2-2.5zM9.5 8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>
          </figure>
        </a>

        <div className='relative max-w-[400px] w-full flex items-center gap-3'>
          <div className='relative w-full max-w-xl focus-within:text-blue-500'>
            <div className='absolute inset-y-0 flex items-center pl-2'>
              <svg className='fill-blue-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"/></svg>
            </div>
            <input
            type="text"
            placeholder='Search for employees'
            aria-label='Search'
            className='w-full pl-8 px-4 py-2 text-md border-0 rounded-md placeholder-gray-500 backdrop-blur-xl bg-white/40 text-neutral-700 focus:bg-white/70 focus:shadow-outline-gray focus:placeholder-gray-700 focus:outline-none focus:shadow-outline-blue form-input'
            onChange={e => setQuery(e.target.value)}
            />
          </div>

          <div className='absolute z-20 left-0 top-0 mt-12 w-full'>
            {(search && query) ? <EmployeeSearch employees={search} /> : null}
          </div>
        </div>
      </header>
  </>
}