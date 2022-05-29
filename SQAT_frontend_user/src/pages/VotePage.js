import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Card, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import CandidatesList from '../components/candidatesList'
import Countdown from '../components/countdown';
import axios from 'axios'

function VotePage() {
    const classes = useStyles()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const getCandidates = async () => {
            try {
                const result = await axios.get('https://e909-197-156-118-253.eu.ngrok.io/candidates');
                setCandidates(result.data);
            } catch (error) {
                setHasError(true);
            }
            setIsLoading(false)
        }
        getCandidates()
    });

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
                                <Countdown />
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
                            {isLoading && (
                                <Typography>Loading ....</Typography>

                            )}
                            {hasError && (
                                <Typography>failed</Typography>
                            )}
                            {!isLoading && candidates && (
                                <>
                                    {
                                        candidates.length === 0 && (
                                            <Typography>Nothing</Typography>
                                        )
                                    }
                                    {candidates.map((candidate) => (
                                        <CandidatesList
                                            name={candidate.name}
                                            fname={candidate.fname}
                                            dept={candidate.dept}
                                            sections={candidate.section}
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