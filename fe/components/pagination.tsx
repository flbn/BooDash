import { number } from "prop-types"
import { Employee } from "../types/employee"


export const Pagination = ({paginate, setCurrentPage, count, page}: {paginate: any, setCurrentPage: any, count: number, page: number}) => {

  const prev = () => {
    if(page !== 1) {
      const previousPage: number = page - 1
      paginate(page, setCurrentPage, previousPage)
    }
  }

  const next = () => {
    if(page !== Math.ceil(count / 10)) {
      const nextPage: number = page + 1
      paginate(page, setCurrentPage, nextPage)
    }
  }

  return <>
        <div className='backdrop-blur-xl bg-white/60 text-gray-400 flex justify-between items-center sm:grid px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t border-white/60 sm:grid-cols-9 rounded-bl-lg rounded-br-lg'>
        <span className='flex items-center col-span-3'>
          Showing {(page == 1) ? 1 : ((page - 1) * 10) + 1 }-{(page == 1) ? 10 : ((page * 10) + 1 <= count ) ? ((page * 10) + 1) : count } of {count}
        </span>
        <span className='col-span-2'/>
        <span className='flex col-span-4 sm:mt-auto sm:justify-end'>
        <nav aria-label="Directory navigation">
          <ul className="inline-flex items-center">
            <li>
              <button onClick={() => prev()} className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-blue" aria-label="Previous">
                <svg aria-hidden="true" className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </button>
            </li>
            <li>
            <button onClick={() => paginate(page, setCurrentPage, 1)} className={ (( page > 5 ) ? 'hidden': (page == 1 ? 'px-3 py-1 text-white transition-colors duration-150 bg-blue-400/60 rounded-md focus:outline-none focus:shadow-outline-blue': 'bg-red px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-blue'))}>
                1
              </button>
            </li>
            <li>
            <button onClick={() => paginate(page, setCurrentPage, 2)} className={ ((count < 10 || page > 4 ) ? 'hidden': (page == 2 ? 'px-3 py-1 text-white transition-colors duration-150 bg-blue-400/60 rounded-md focus:outline-none focus:shadow-outline-blue': 'bg-red px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-blue'))}>
                2
              </button>
            </li>
            <li>
            <button onClick={() => paginate(page, setCurrentPage, 3)} className={ ((count < 20 || page > 5 ) ? 'hidden': (page == 3 ? 'px-3 py-1 text-white transition-colors duration-150 bg-blue-400/60 rounded-md focus:outline-none focus:shadow-outline-blue': 'bg-red px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-blue'))}>
                3
              </button>
            </li>
            <li>
            <button onClick={() => paginate(page, setCurrentPage, 4)} className={ ((count < 30 || page > 6 ) ? 'hidden': (page == 4 ? 'px-3 py-1 text-white transition-colors duration-150 bg-blue-400/60 rounded-md focus:outline-none focus:shadow-outline-blue': 'bg-red px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-blue'))}>
                4
              </button>
            </li>
            <li>
              <button onClick={() => next()} className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-blue" aria-label="Next">
                <svg className="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
        </span>
      </div>
    </>
}