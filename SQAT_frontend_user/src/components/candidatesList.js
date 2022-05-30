import { Button } from '@material-ui/core'
import { Avatar } from '@material-ui/core'
import { Card } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const deptTypes = [
    "Software Engineering",
    "Biomedical Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
];

function CandidatesList(props) {
    const navigate = useNavigate()
    const viewProfile = () => {
        console.log("Here");
        navigate("/candidateProfile", { state: props.id })
    }

    return (
        <Card>
            <Box display="flex" justifyContent="Space-between">
                <Box m={2} display="flex">

                    <img alt="" src='https://randomuser.me/api/portraits/women/81.jpg'></img>
                    <Box ml={3} display="flex" flexDirection="column" justifyContent="center">
                        <Box display="flex">

                            <Typography variant="h5">{props.name} {props.fname}</Typography>
                            <Button variant="contained"
                                style={{
                                    paddingInline: '15px',
                                    marginInline: '10px',
                                    borderRadius: '10px',
                                    fontSize: '12px'
                                }}
                                onClick={viewProfile}>View Profile
                            </Button>
                        </Box>
                        <Box>

                            <Typography style={{ fontSize: 12 }} variant="h6">{deptTypes[props.dept]}</Typography>
                            <Typography style={{ fontSize: 12 }} variant="h6">Year {props.year}</Typography>
                            <Typography style={{ fontSize: 12 }} variant="h6">Section {props.section}</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" m={5} justifyContent="center">
                    <Button variant="outlined" style={{
                        borderRadius: 5,
                        color: "#00D05A"
                    }}>Vote</Button>
                </Box>
            </Box>
        </Card>
    )
}

export default CandidatesList