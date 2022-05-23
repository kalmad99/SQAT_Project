import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios'

export default function Result() {
    let location = useLocation();

    const electionId = location.state
    const [election, setElection] = useState(null);
    const [candidates, setCandidates] = useState([]);

    let navigate = useNavigate();

    const onCancel = () => {
        navigate(-1);
    }
    
    useEffect(() => {
        const getElectionDetail = async () => {
            const elect = await axios.get('https://4262-197-156-103-53.eu.ngrok.io/elections/' + electionId);
            setElection(elect.data.data)
            const result = await axios.get('https://4262-197-156-103-53.eu.ngrok.io/results/' + electionId);
            setCandidates(result.data.data);
            console.log(elect.data.data)
        }
        getElectionDetail()
    }, [electionId]);

    return (
        <div class="min-h-screen w-[50vw] bg-white-800 flex flex-col py-4 px-4 lg:px-8">
            <div class="w-full py-4 px-4 lg:px-8 rounded-2xl bg-white-700">
                <div>
                    <h2 class="my-4 text-xl text-center font-bold text-gray-900">{election.name}</h2>
                </div>
                {candidates.map((candidate, index) => (
                    <div class="flex flex-row justify-evenly items-center p-2 m-2">
                        <div>
                            <h2 class="my-4 text-l font-semibold text-gray-900">{index+1}</h2>
                        </div>
                        <div class="relative w-28 h-28">
                            <img src="https://randomuser.me/api/portraits/women/81.jpg" alt='' />

                        </div>
                        <div>
                            <h2 class="my-4 text-l font-semibold text-gray-900"><span>{candidate.name}</span> <span>{candidate.fname}</span></h2>
                        </div>
                        <div>{candidate.voteCount}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}