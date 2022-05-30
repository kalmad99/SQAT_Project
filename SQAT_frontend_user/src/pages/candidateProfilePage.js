import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Grid, Button } from '@material-ui/core'
import { useNavigate, useLocation } from "react-router-dom";
import axios, { getToken } from '../Api/axiosConfig'
import { SpinnerCircularFixed } from "spinners-react";

export default function CandidateProfilePage() {
    let location = useLocation();
    let navigate = useNavigate();

    const candidateId = location.state
    const token = getToken()
    const [candidate, setCandidate] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const onCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        const getCandidateDetail = async () => {
            try {
                const result = await axios.get('https://e909-197-156-118-253.eu.ngrok.io/candidates/' + candidateId, {
                    headers: {
                        Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                    }
                });
                setCandidate(result.data.data);
            } catch (error) {
                setHasError(true);
            }
            setIsLoading(false)
        }
        getCandidateDetail()
    }, [candidateId, token]);

    return (
        <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh', minWidth: "80vw" }}
        >
            {isLoading && (
                <>
                    <SpinnerCircularFixed
                        size={50}
                        thickness={100}
                        speed={100}
                        color="#36ad47"
                        secondaryColor="rgba(0, 0, 0, 0.44)"
                    />
                </>
            )}
            {hasError && (
                <>
                    <h3>Ooops something went wrong</h3>
                    <h2>{hasError.message}</h2>
                </>
            )}
            {!isLoading && candidate && (
                <>
                    <Grid item xs={12} lg={3}>
                        <Paper elevation={3}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                spacing={3}
                                alignItems="center"
                                minHeight="46vh"
                                boxShadow='2'
                            >
                                <Box item mb={2}>

                                    <Avatar
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Box>
                                <Box item paddingX={2}>

                                    <Typography>{candidate.bio}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={5} >
                        <Paper elevation={3} style={{ minHeight: "5vh", minWidth: "40vw", marginBottom: "10px" }}>
                            <Grid item xs={12}>
                                <Grid container justifyContent='center'>

                                    <Typography variant='h5'>Candidate Details</Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Paper elevation={3} style={{ padding: "10px" }}>

                            <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                                <Grid item xs={3}>
                                    <Typography>
                                        First Name :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.name}/>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography>
                                        Last Name :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.fname} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        Grandfather Name :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.gname}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        ID :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.id} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        Email :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.email} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        Department :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.dept} />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        Year :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.year}/>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        Section :
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} style={{ marginBottom: "10px" }}>
                                    <TextField id="outlined-basic" variant="outlined" fullWidth size="small" value={candidate.section} />
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid>
                            <Button variant='contained' style={{backgroundColor: '#00D05A', color: 'white', marginTop: '10px'}} onClick={onCancel}>Cancel</Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Grid>



    )
}
