import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import CandidatesList from '../components/candidatesList'
// import Countdown from '../components/countdown';
import axios, { getToken } from '../Api/axiosConfig'
import { loggedin_user } from '../RouteHandler/loggedinuser'
import { SpinnerCircularFixed } from "spinners-react";

const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

function VotePage() {
    const classes = useStyles()
    const token = getToken()
    const [user, setUser] = useState()
    const [role, setRole] = useState('')
    const payload = loggedin_user()
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [isElectionsLoading, setIsElectionsLoading] = useState(true)
    const [userHasError, setUserHasError] = useState(false)
    const [electionsHasError, setElectionsHasError] = useState(false)
    const [elections, setElections] = useState([]);
    const [election, setElection] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                var result = await axios.get('/voters/' + payload.id, {
                    headers: {
                        Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                    }
                })
                if (!result.data.data) {
                    result = await axios.get('/candidates/' + payload.id, {
                        headers: {
                            Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                        }
                    })
                    setRole('candidate')
                } else {
                    setRole('voter')
                }
                setUser(result.data.data);
            } catch (error) {
                setUserHasError(true);
            }
            setIsUserLoading(false)
        }
        getUser()
    }, [payload.id, token])

    useEffect(() => {
        const getElections = async () => {
            try {
                const result = await axios.get('/elections/', {
                    headers: {
                        Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                    }
                })
                setElections(result.data.data);
            } catch (error) {
                setElectionsHasError(true);
            }
            setIsElectionsLoading(false)
        }
        getElections()
    }, [token])

    useEffect(() => {
        const getElection = async () => {
            for (var i = 0; i < elections.length; i++) {
                // for (var j = 0; j < elections[i].voters.length; j++) {
                //     if (isEqual(elections[i].voters[j], user)) {
                        setElection(elections[i])
                        return;
                //     }
                // }
            }
        }
        getElection()
    }, [elections, user]);

    return (
        <div >
            <Grid
                container
                alignItems='center'
                justifyContent='center'
                spacing={5}
                style={{ height: '100vh' }}
            >
                <Grid item xs={12} className={classes.body}>
                    <Grid container justifyContent='center'  >
                        <Grid item xs={9} >
                            <Grid container direction='column' justifyContent='center'>
                                {/* <Typography variant='h4' className={classes.my_typogrphy}>Time Remaining </Typography> */}
                                {/* <Typography variant='h4' className={classes.my_typogrphy}>{timerDays} : {timerHours} : {timerMinutes} : {timerSeconds}</Typography> */}
                                {/* <Countdown /> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={11} md={9} style={{ height: '75vh' }}>
                    <Grid
                        container
                        alignItems='center'
                        justifyContent='center'
                        spacing={5}
                    >
                        <Grid item xs={12}>
                            {(isUserLoading || isElectionsLoading) && (
                                <Grid container justifyContent='center' alignItems="center">
                                    <SpinnerCircularFixed
                                        size={50}
                                        thickness={100}
                                        speed={100}
                                        color="#36ad47"
                                        secondaryColor="rgba(0, 0, 0, 0.44)"
                                    />
                                </Grid>
                            )}
                            {(userHasError || electionsHasError) && (
                                <Grid container justifyContent='center' >
                                    <h3>Ooops something went wrong</h3>
                                </Grid>
                            )}
                            {!(isUserLoading || isElectionsLoading) && role === 'candidate' && (
                                <Grid container justifyContent='center' >
                                    <Typography>You are a candidate, you cant vote!</Typography>
                                </Grid>
                            )}
                            {!(isUserLoading || isElectionsLoading) && role === 'voter' && election && election.candidates && (
                                <>
                                    {election.candidates.map((candidate) => (
                                        <CandidatesList
                                            key={candidate._id}
                                            id={candidate._id}
                                            name={candidate.name}
                                            fname={candidate.fname}
                                            dept={candidate.dept}
                                            year={candidate.year}
                                            section={candidate.section}
                                            electionId={election._id}
                                        />
                                    ))}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },
    body: {
        padding: theme.spacing(4),
        backgroundColor: "#2F313D",
        minHeight: "25vh",
    },
    my_typogrphy: {
        color: "white",
    }

}));
export default VotePage