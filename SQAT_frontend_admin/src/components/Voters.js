import React, { useState, useEffect } from "react";
import UsersTable, { Detail } from "./VotersTable";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

// import { VotersData } from './VotersData';
import axios from 'axios'
// import { SpinnerCircularFixed } from "spinners-react";
// import StudentContract from "../contracts/AAiTStudent.json";
// import { useAPIContract } from "../hooks/useAPIContract";
// import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

export default function Voters() {

  const [voters, setVoters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")

  const clearSearch = () => {
    setSearchQuery("")
  }

  useEffect(() => {
    const getVoters = async () => {
      const result = await axios.get('https://4262-197-156-103-53.eu.ngrok.io/voters?query=' + searchQuery);
      setVoters(result.data);
    }
    getVoters()
  }, [searchQuery]);


  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
      },
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Section",
        accessor: "section",
      },
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Department",
        accessor: "dept",
      }
    ],
    []
  );

  let navigate = useNavigate();
  const routeChange = () => {
      let path = window.location.pathname + '/newuser';
      navigate(path);
  }

  return (
    <div class="min-h-screen w-full bg-white-800 flex flex-col justify-center items-center py-4 px-4 lg:px-8">
      {/* {isGetAllVotersLoading && (
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
      {getVotersError && (
        <div>
          <h3>Ooops something went wrong</h3>
          <h2>{getVotersError.message}</h2>
        </div>
      )} */}
      {/* {votersData && votersData.length !== 0 ( */}
      <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
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
            <button onClick={routeChange}>Add User</button>
          </div>
        </div>
        <UsersTable columns={columns} data={voters}/>
      </div>
    </div>
  );
}
