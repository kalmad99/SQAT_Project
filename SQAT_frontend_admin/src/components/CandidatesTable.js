import React, { useState, useEffect } from 'react'
import { ImLock, ImUnlocked } from 'react-icons/im';
import { useTable, useSortBy, usePagination } from "react-table";
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/solid'
import { Button, PageButton } from '../shared/Buttons'
import { classNames } from '../shared/Utils';
import axios from 'axios'
import { Link } from 'react-router-dom';

const CandidatesTable = ({ columns, data, disqualify }) => {
    const extractCandidates = () => {
        var candidatesData = [];
        if (data && data.length > 0) {
          for (var i = 0; i < data.length; i++) {
            var voter = {
              fullName: `${data[i].name} ${data[i].fname} ${data[i].gname}`,
              section: data[i].section,
              year: data[i].year,
              dept: deptTypes[data[i].dept],
              status: data[i].status,
              email: data[i].email,
              _id: data[i]._id,
            };
            candidatesData.push(voter);
          }
        }
        return candidatesData;
      };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({
        columns,
        data,
        disqualify,
        initialState: { pageIndex: 0, pageSize: 5 }
    },
        useSortBy,
        usePagination
    );
    const deptTypes = [
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Software Engineering",
      ];

    // console.log("zdata",data);
   

    return (
        <div>
            <div className="mt-2 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-4 lg:px-4">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 shadow divide-x divide-gray-200">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-black-500 font-body font-semibold text-sm"
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                >
                                                    {column.render('Header')}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? ' ▼'
                                                                : ' ▲'
                                                            : ''}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    {...getTableBodyProps()}
                                    className="bg-white text-[#595959] font-body font-medium text-sm"
                                >
                                    {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map(cell => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap"
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2">
                        <span className="text-sm text-gray-700">
                            Page <span className="font-medium">{pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
                        </span>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <PageButton
                                className="rounded-l-md"
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">First</span>
                                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                onClick={() => nextPage()}
                                disabled={!canNextPage
                                }>
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                            <PageButton
                                className="rounded-r-md"
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                            >
                                <span className="sr-only">Last</span>
                                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                            </PageButton>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidatesTable

export function StatusPill({ value }) {
    const status = value ? "active" : "disqualified";

    return (
        <span
            className={classNames(
                "py-1 capitalize leading-wide font-bold text-xs rounded-full shadow-sm",
                status.startsWith("active") ? "bg-green-200 p-2 text-green-700" : null,
                status.startsWith("disqualified") ? "bg-gray-200 p-2 text-gray-700" : null
            )}
        >
            {status}
        </span>
    );
}

export function Lock({ value, data, disqualify }) {
    var lockvalue; 
    for (var i = 0; i < data.length; i++) {
        if (value === data[i].email){
            lockvalue = data[i].status
            break
        }
    }

    const [lock, setLock] = useState(lockvalue);
    
    const disqualifyCandidate = async () => {
        await axios.patch('http://localhost:8080/candidates', {
            email: value
        })
    }

    const click = () => {
        const editedTaskList = data.map(candidate => {
            if (value === candidate.email) {
                console.log(value, candidate.email)
                setLock(!candidate.status)
                return { ...candidate, status: !candidate.status }
            }
            return candidate;
        });
        console.log("edited",editedTaskList);
        disqualify(editedTaskList)
        disqualifyCandidate()
    }
    const result = lock && lock ? <ImUnlocked /> : <ImLock />;

    return (
        <span>
            <button onClick={() => click()}>
                {result}
            </button>
        </span>
    )
}

export function Detail({ value }) {
    const result = <Link to="/candidateDetail" state={value} class="text-blue-600 dark:text-blue-500 hover:underline">Details</Link>
    return (
        <span>
            {result}
        </span>
    )
}