import { useState } from 'react';
import { GetServerSideProps } from 'next'
import { GET_EMPLOYEE } from '../../gql/queries'
import client from '../../apollo-client';
import { Employee } from '../../types/employee';
import Image from 'next/image'
import * as HoverCard from '@radix-ui/react-hover-card';
import { EditEmployee } from '../../components/employee'


export default function PostPage({data}:{data: any}) {

  const [updatedEmployee, setUpdatedEmployee] = useState(data?.employee);

  return <>
  <main className='min-h-screen min-w-screen bg-gradient-to-b from-blue-100 to-pink-100 py-4 px-4'>
    <section className='mt-4 w-full flex-col'>
      <div className='relative w-48 h-48 rounded-full mb-4 mx-auto'>
        <figure>
           <Image src={`https://avatars.dicebear.com/api/big-ears-neutral/${updatedEmployee.id}.svg`} alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
        </figure>
        <div className='absolute inset-0 rounded-full shadow-inner ring ring-4 ring-white shadow-xl'/>
        <HoverCard.Root>
          <HoverCard.Trigger className='absolute cursor-pointer right-0 bottom-0 mb-8 bg-neutral-100 rounded-full px-2 py-1 text-2xl'>
          &#129302;
          </HoverCard.Trigger>
          <HoverCard.Content className='mt-2 bg-white rounded-md px-6 py-6 w-full max-w-[300px] sm:max-w-[500px] shadow-md'>
            <div className=''>
              <div className='relative block w-14 h-14 rounded-full mb-2'>
                <figure>
                  <Image src='/avi.jpg' alt='avatar' layout={'fill'} className='object-cover w-full h-full rounded-full aspect-square' />
                </figure>
              </div>

              <div className='w-content block'>
                <a className='font-semibold text-md text-neutral-800' href="https://flbn.sh">Oliver</a>
              </div>

              <div className='w-content block'>
              <a className='font-normal text-md text-neutral-400' href="https://flbn.sh">@flbn</a>
              </div>

              <div className='mt-1'>
                <p>Follow me! I'm a full-stack developer, currently exploring what Rust has to offer (mostly interested in Web Assembly, but Actix-web as well) and perpetually keeping up with the ~current trends~ in the JavaScript ecosystem. I like to read books (classics and sci-fi, mostly), travel, and take my dogs out to do dog things.</p>
              </div>
            </div>
          </HoverCard.Content>
        </HoverCard.Root>
      </div>
      <h2 className='font-bold text-xl text-center'>{`${updatedEmployee.firstName} ${updatedEmployee.lastName}`}</h2>

      <div className='flex flex-cols justify-center gap-3 my-4'>
        <a className='backdrop-blur-xl bg-white/30 px-2 py-2 rounded-full' href="https://flbn.sh">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 1 0-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 0 1 9.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 0 1-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 1 0 7.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z"/></svg>
        </a>
        <a className='backdrop-blur-xl bg-white/30 px-2 py-2 rounded-full' href="https://github.com/flbn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.883 18.653c-.3-.2-.558-.455-.86-.816a50.32 50.32 0 0 1-.466-.579c-.463-.575-.755-.84-1.057-.949a1 1 0 0 1 .676-1.883c.752.27 1.261.735 1.947 1.588-.094-.117.34.427.433.539.19.227.33.365.44.438.204.137.587.196 1.15.14.023-.382.094-.753.202-1.095C5.38 15.31 3.7 13.396 3.7 9.64c0-1.24.37-2.356 1.058-3.292-.218-.894-.185-1.975.302-3.192a1 1 0 0 1 .63-.582c.081-.024.127-.035.208-.047.803-.123 1.937.17 3.415 1.096A11.731 11.731 0 0 1 12 3.315c.912 0 1.818.104 2.684.308 1.477-.933 2.613-1.226 3.422-1.096.085.013.157.03.218.05a1 1 0 0 1 .616.58c.487 1.216.52 2.297.302 3.19.691.936 1.058 2.045 1.058 3.293 0 3.757-1.674 5.665-4.642 6.392.125.415.19.879.19 1.38a300.492 300.492 0 0 1-.012 2.716 1 1 0 0 1-.019 1.958c-1.139.228-1.983-.532-1.983-1.525l.002-.446.005-.705c.005-.708.007-1.338.007-1.998 0-.697-.183-1.152-.425-1.36-.661-.57-.326-1.655.54-1.752 2.967-.333 4.337-1.482 4.337-4.66 0-.955-.312-1.744-.913-2.404a1 1 0 0 1-.19-1.045c.166-.414.237-.957.096-1.614l-.01.003c-.491.139-1.11.44-1.858.949a1 1 0 0 1-.833.135A9.626 9.626 0 0 0 12 5.315c-.89 0-1.772.119-2.592.35a1 1 0 0 1-.83-.134c-.752-.507-1.374-.807-1.868-.947-.144.653-.073 1.194.092 1.607a1 1 0 0 1-.189 1.045C6.016 7.89 5.7 8.694 5.7 9.64c0 3.172 1.371 4.328 4.322 4.66.865.097 1.201 1.177.544 1.748-.192.168-.429.732-.429 1.364v3.15c0 .986-.835 1.725-1.96 1.528a1 1 0 0 1-.04-1.962v-.99c-.91.061-1.662-.088-2.254-.485z"/></svg>
        </a>
        <a className='backdrop-blur-xl bg-white/30 px-2 py-2 rounded-full' href="https://www.linkedin.com/in/9405123485-/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 0 1-1.548-1.549 1.548 1.548 0 1 1 1.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"/></svg>
        </a>
      </div>

      <div className='grid place-items-center'>
        <EditEmployee setUpdatedEmployee={setUpdatedEmployee} updatedEmployee={updatedEmployee}/>
      </div>

      <div className='block gap-2 w-full mt-4'>
        <div className='mx-auto max-w-xs backdrop-blur-xl bg-white/50 text-center p-4 rounded-lg shadow-xs'>
          <div className='inline-block align-middle p-3 bg-blue-500 text-blue-100 rounded-full'>
            <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zM4 16v3h16v-3H4zm0-2h16V7H4v7zM9 3v2h6V3H9zm2 8h2v2h-2v-2z"/></svg>
          </div>
          <p className='block text-center font-bold mt-1'>{updatedEmployee.jobTitle}</p>
        </div>
      </div>

      <div className='min-w-full mt-5 overflow-x-scroll rounded-lg'>
        <table className='min-w-full whitespace-no-wrap border-collapse'>
          <thead className=''>
            <tr className='rounded-tl-lg rounded-tr-lg text-xs font-semibold tracking-wide text-left backdrop-blur-xl bg-white/60 text-slate-500 uppercase border-b border-neutral-300/60'>
              <th className='px-4 py-3'>ID</th>
              <th className='px-4 py-3'>Salary</th>
              <th className='px-4 py-3'>Department</th>
              <th className='px-4 py-3'>Location</th>
            </tr>
          </thead>
            <tbody className='w-full backdrop-blur-xl bg-white/50 divide-y divide-white/40'>
              <tr className='text-slate-700 w-full'>
                <td className='px-4 py-3 text-sm whitespace-nowrap font-medium'>{updatedEmployee.id}</td>
                <td className='px-4 py-3 text-sm whitespace-nowrap font-medium'>${updatedEmployee.salary.toLocaleString('en-US')}</td>
                <td className='px-4 py-3 text-sm font-medium'>{updatedEmployee.department}</td>
                <td className='px-4 py-3 text-sm font-medium'>{updatedEmployee.location}</td>
              </tr>
            </tbody>
          </table>
        </div>

    </section>
  </main>
  </>
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { data } = await client.query({ query: GET_EMPLOYEE, variables: { id: context?.params?.id } });

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }
  };
};