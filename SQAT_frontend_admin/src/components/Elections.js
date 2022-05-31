import React, { useEffect, useState } from 'react'
import ElectionTable, { Detail } from './ElectionsTable'
import axios from 'axios'
import { AiOutlineClose } from "react-icons/ai";
import { SpinnerCircularFixed } from "spinners-react";
import { useNavigate } from "react-router-dom";

export default function Election() {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [elections, setElections] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")

    const clearSearch = () => {
        setSearchQuery("")
    }

    useEffect(() => {
        const getElections = async () => {
            try {
                const result = await axios.get('http://localhost:8080/elections?query=' + searchQuery)
                console.log(result.data);
                setElections(result.data.data);
            } catch (error) {
                setHasError(true);
            }
            setIsLoading(false)
        }
        getElections()
    }, [searchQuery]);

    const columns = React.useMemo(() =>
        [
            {
                Header: "Election Name",
                accessor: "name",
            },
            {
                Header: "Time Remaining",
                accessor: "time",
            },
            {
                Header: "",
                accessor: "_id",
                Cell: Detail,
            }
        ],
        []);

    let navigate = useNavigate();
    const routeChange = () => {
        let path = window.location.pathname + '/newelection';
        navigate(path);
    }

    return (
        <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
            {isLoading && (
                <div>
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                </div>
            )}
            {hasError && (
                <div>
                    <h3>Ooops something went wrong</h3>
                    <h2>{hasError.message}</h2>
                </div>
            )}
            {!isLoading && elections && (
                < div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                    <div class="flex justify-between items-center">
                        <div class="p-2 pl-0">
                            <label for="table-search" class="sr-only">Search</label>
                            <div class="relative flex items-center mt-1">
                                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search..." />
                                <div class="p-2 pl-0 -ml-6 text-gray-50">
                                    <AiOutlineClose onClick={clearSearch} />
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#00D05A] text-white mt-1 p-3 rounded-xl font-body font-light text-sm">
                            <button data-cy="add-election-button" onClick={routeChange}>Add Election</button>
                        </div>
                    </div>
                    <ElectionTable columns={columns} data={elections} />
                </div>
            )}
        </div>
    )
}