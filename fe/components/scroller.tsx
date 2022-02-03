import react, { useEffect, useState} from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { Employee } from '../types/employee';
import Image from 'next/image'

export const EmployeeSearch = ({employees}: {employees: any}) => {

  const [toggle, setToggle] = useState(false);
  
  useEffect( () => {
    (employees) ? setToggle(true) : setToggle(false)
  }, [employees])

  const closeMenu = () => setToggle(false)

  return <>
  {(toggle) ?
  (employees.length > 0) ?
    <ScrollAreaPrimitive.Root className='w-full h-[225px] bg-blue-100/90 backdrop-blur-xl rounded-md overflow-hidden shadow-md' >
      <ScrollAreaPrimitive.Viewport className='w-full h-full rounded-md py-5 bg-white/60'>
        <div className='w-full text-right px-5'>
          <button className='w-content mb-2' onClick={closeMenu}>
            <svg fill="url(#gradient-horizontal) #60a5fa;" className='float-right close-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
            <linearGradient id="gradient-horizontal">
              <stop offset="0%" stopColor="var(--color-stop-1)" />
              <stop offset="50%" stopColor="var(--color-stop-2)" />
              <stop offset="100%" stopColor="var(--color-stop-3)" />
            </linearGradient>
              <path fill="transparent" d="M0 0h24v24H0z"/>
              <path fill="url(#gradient-horizontal) #60a5fa" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
            </svg>
          </button>
        </div>
        <div className=''>
          {employees.map((e: Employee) => (
            <a key={e.id} className='flex flex-cols justify-between text-slate-700 w-full border-b border-neutral-200' href={`/e/${e.id}`}>
            <div className='pl-5 py-3'>
              <div className='flex items-center text-sm'>
                <figure className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                  <Image src={`https://avatars.dicebear.com/api/big-ears-neutral/${e.id}.svg`} alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
                  <div className='absolute inset-0 rounded-full shadow-inner'/>
                </figure>
                <div>
                  <p className='font-semibold capitalize'>{e.fullName}</p>
                  <p className='text-xs text-gray-500'>{e.id}</p>
                </div>
              </div>
            </div>

            <div className='pr-5 py-3 text-sm font-medium text-right'>{e.jobTitle}</div>

        </a>
          ))}
        </div>
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar className='flex flex-cols p-2 bg-white/80' orientation="vertical">
        <ScrollAreaPrimitive.Thumb className='flex-1 bg-blue-400 rounded-lg relative before:content-none before:absolute before:top-1/2 before:left-1/2 before:translate-y-[-50%] before:translate-x-[-50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]' />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Scrollbar className='flex flex-cols p-2 bg-white/80' orientation="horizontal">
        <ScrollAreaPrimitive.Thumb className='flex-1 bg-blue-400 rounded-lg relative before:content-none before:absolute before:top-1/2 before:left-1/2 before:translate-y-[-50%] before:translate-x-[-50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]' />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className='bg-neutral-300' />
    </ScrollAreaPrimitive.Root>
    : <ScrollAreaPrimitive.Root className='w-full h-[225px] bg-blue-100/90 backdrop-blur-xl rounded-md overflow-hidden shadow-md' >
    <ScrollAreaPrimitive.Viewport className='w-full h-full rounded-md px-5 py-5 bg-white/60'>
      <div className='w-full text-right'>
        <button className='w-content' onClick={closeMenu}>
          <svg fill="url(#gradient-horizontal) #60a5fa;" className='float-right close-button' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
          <linearGradient id="gradient-horizontal">
            <stop offset="0%" stopColor="var(--color-stop-1)" />
            <stop offset="50%" stopColor="var(--color-stop-2)" />
            <stop offset="100%" stopColor="var(--color-stop-3)" />
          </linearGradient>
            <path fill="transparent" d="M0 0h24v24H0z"/>
            <path fill="url(#gradient-horizontal) #60a5fa" d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/>
          </svg>
        </button>
      </div>
      <div className=''>
        <div className='py-3 mt-2 w-full text-center'>
          <svg className='mx-auto mb-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 12a8 8 0 1 0-16 0v4h3a1 1 0 0 1 1 1v3h8v-3a1 1 0 0 1 1-1h3v-4zm-2 6v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3H3a1 1 0 0 1-1-1v-5C2 6.477 6.477 2 12 2s10 4.477 10 10v5a1 1 0 0 1-1 1h-3zM7.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
          <p className='font-semibold'>No Employees Found</p>
        </div>
      </div>
    </ScrollAreaPrimitive.Viewport>
    <ScrollAreaPrimitive.Scrollbar className='flex flex-cols p-2 bg-neutral-800' orientation="vertical">
      <ScrollAreaPrimitive.Thumb className='flex-1 bg-blue-400 rounded-lg relative before:content-none before:absolute before:top-1/2 before:left-1/2 before:translate-y-[-50%] before:translate-x-[-50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]' />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Scrollbar className='flex flex-cols p-2 bg-neutral-800' orientation="horizontal">
      <ScrollAreaPrimitive.Thumb className='flex-1 bg-blue-400 rounded-lg relative before:content-none before:absolute before:top-1/2 before:left-1/2 before:translate-y-[-50%] before:translate-x-[-50%] before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]' />
    </ScrollAreaPrimitive.Scrollbar>
    <ScrollAreaPrimitive.Corner className='bg-neutral-300'/>
  </ScrollAreaPrimitive.Root>
  : null
  }
  </>
  }

export default EmployeeSearch;

