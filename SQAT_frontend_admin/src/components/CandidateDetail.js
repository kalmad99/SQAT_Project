import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function CandidateDetail() {
  let location = useLocation();

  const candidateId = location.state;
  const [candidate, setCandidate] = useState([]);

  let navigate = useNavigate();

  const onCancel = () => {
    navigate(-1);
  };
  const deptTypes = [
    "Software Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
  ];

  useEffect(() => {
    const getCandidateDetail = async () => {
      const result = await axios.get(
        "http://localhost:8080/candidates/" + candidateId
      );
      setCandidate(result.data.data);
    };
    getCandidateDetail();
  }, [candidateId]);

  return (
    <div class="min-h-screen w-full bg-white-800">
      <div class="flex flex-col justify-center items-center py-8 px-8 lg:px-16">
        <div class="relative w-28 h-28">
          <img
            class="rounded-full border border-gray-100 shadow-sm object-cover"
            alt=""
            src="https://randomuser.me/api/portraits/women/81.jpg"
          />
        </div>
        <div>
          <h2 class="my-4 text-xl font-bold text-gray-900">
            {candidate.fullName}
          </h2>
        </div>
        <div class="text-l text-center w-[50vw] font-regular text-gray-900">
          <p>{candidate.bio}</p>
        </div>
        <div class="w-[40vw] py-2 px-4 lg:px-8">
          <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
            <label
              class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-name"
            >
              Name
            </label>
            <input
              class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-name"
              name="name"
              type="text"
              value={candidate.name}
            />
          </div>
          <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
            <label
              class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-fname"
            >
              Father's Name
            </label>
            <input
              class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-fname"
              name="fname"
              type="text"
              value={candidate.fname}
            />
          </div>
          <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
            <label
              class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-gname"
            >
              Grandfather's Name
            </label>
            <input
              class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-gname"
              name="gname"
              type="text"
              value={candidate.gname}
            />
          </div>
          <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
            <label
              class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-dept"
            >
              Department
            </label>
            <input
              class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-dept"
              name="dept"
              type="text"
              value={deptTypes[candidate.dept]}
            />
          </div>
          <div class="flex flex-row justify-between items-center mb-6 md:mb-1">
            <label
              class="w-full md:w-1/3 px-3 block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-batch"
            >
              Batch
            </label>
            <input
              class="appearance-none block w-full md:w-2/3 bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-batch"
              name="batch"
              type="text"
              value={candidate.year}
            />
          </div>
          <div class="flex flex-row justify-between items-center">
            <label
              class="w-full md:w-1/3 px-3  block tracking-wide text-gray-700 text-xs font-bold my-2 mx-4"
              for="grid-sect"
            >
              Section
            </label>
            <input
              class="appearance-none block w-full md:w-2/3  bg-white-200 text-sm text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-sect"
              name="sect"
              type="text"
              value={candidate.section}
            />
          </div>
        </div>
      </div>
      <div class="w-[10vw] bg-white float-right text-[#00D05A] border border-[#00D05A] text-center py-2 mx-10 rounded-xl font-body font-light text-sm">
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
