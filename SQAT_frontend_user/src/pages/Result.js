import { Grid, Typography, makeStyles, Avatar, Container, Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import axios, { getToken } from '../Api/axiosConfig'
import { SpinnerCircularFixed } from "spinners-react";

// function createData(Ranks, Views, Full_name, Other_info) {
//     return { Ranks, Views, Full_name, Other_info }
// }

// const rows = [
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
//     createData(1, 145, "Abebe Kebede", "other information"),
// ]

function Result() {
    const classes = useStyles();
    const token = getToken()
    const [election, setElection] = useState();
    const [elections, setElections] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const getElections = async () => {
        try {
            const result = await axios.get('/elections', {
                headers: {
                    Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                }
            })
            setElections(result.data.data);
        } catch (error) {
            setHasError(true);
        }
        setIsLoading(false)
    }

    const getElection = async (id) => {
        try {
            const result = await axios.get('/elections/' + id, {
                headers: {
                    Authorization: 'Bearer ' + token  //the token is a variable which holds the token
                }
            })
            setElection(result.data.data);
        } catch (error) {
            setHasError(true);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        getElections()
    });

    const handleChange = async (event) => {
        const temp = await getElection(event.target.value)
    };
    return (
        <Grid container >
            <Grid container justifyContent='center' className={classes.my_background} >
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
                <Grid item xs={4} sm={12}>

                    <Typography className={classes.my_typogrphy} variant='h5' >
                        Election Results
                    </Typography>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            style={{ background: "white" }}
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={election ? election._id : ''}
                            onChange={handleChange}
                            label="Section"
                        >
                            <MenuItem selected disabled hidden>--Select--</MenuItem>
                            {elections.map((election) => (
                                <MenuItem value={election._id}>{election.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {!isLoading && elections && election && (
                    <>
                        <Grid item xs={12} sm={11} md={8}>
                            <Grid container spacing={1} justifyContent='space-around' alignItems='center' >
                                <Box display="flex" flexDirection="column" alignItems='center' spacing={3}>
                                    <Box display="flex" alignItems="flex-end" mb={0.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>2</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>nd</Typography>
                                    </Box >
                                    <Avatar className={classes.small}></Avatar>
                                    <Box mt={0.7}>

                                        <Typography className={classes.my_typogrphy}>{election.candidates[1].fullName}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>{election.candidates[1].voteCount}</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>vote</Typography>
                                    </Box >

                                </Box>

                                <Box display="flex" flexDirection="column" alignItems='center' spacing={3}>
                                    <Box display="flex" alignItems="flex-end" mb={0.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>1</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>st</Typography>
                                    </Box >
                                    <Avatar className={classes.large}></Avatar>
                                    <Box mt={0.7}>

                                        <Typography className={classes.my_typogrphy}>{election.candidates[0].fullName}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={4.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>{election.candidates[0].voteCount}</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>vote</Typography>
                                    </Box >
                                </Box>

                                <Box display="flex" flexDirection="column" alignItems='center' spacing={3}>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>3</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>rd</Typography>
                                    </Box >
                                    <Avatar className={classes.small}></Avatar>
                                    <Box mt={0.7}>

                                        <Typography className={classes.my_typogrphy}>{election.candidates[2].fullName}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Typography className={classes.my_typogrphy} variant='h3'>{election.candidates[1].voteCount}</Typography>
                                        <Typography className={classes.my_typogrphy} variant='h6'>vote</Typography>
                                    </Box >
                                </Box>

                            </Grid>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid >
    )
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    my_typogrphy: {
        color: "white",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    table: {
        minWidth: 600,
    },
    my_background: {
        backgroundColor: "#2F313D",
        height: "60vh"
    },
    grid: {
        marginTop: "-60px"
    },
    small: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },

}));
export default Result