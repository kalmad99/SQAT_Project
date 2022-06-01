import { Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import IdeaDetails from '../components/IdeaDetails'
// import SearchBar from '../components/searchBar';
// import FilterComponent from '../components/filterComponent';
import Suggestion from '../components/suggestion';
import axios, { getToken } from '../Api/axiosConfig'

function Ideas() {
    const token = getToken()
    const [isLoading, setIsLoading] = useState(true)
    const [ideas, setIdeas] = useState([]);
    const [hasError, setHasError] = useState(false)
    
    useEffect(() => {
        const getIdeas = async () => {
            try {
                const result = await axios.get('/ideas', {
                    headers: {
                        Authorization: 'Bearer ' +  token  //the token is a variable which holds the token
                    }
                });
                setIdeas(result.data);
            } catch (error) {
                console.log(error)
                setHasError(true);
            }
            setIsLoading(false)
        }
        getIdeas()
    }, []);

    return (
        <Grid container alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
            <Grid
                container
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid item xs={12} sm={8} md={7} lg={6} spacing={3} >
                    <Grid container spacing={4} justifyContent="center">
                        {isLoading && (
                            <Typography>Loading ....</Typography>
                        )}
                        {hasError && (
                            <Typography>failed</Typography>
                        )}
                        {!isLoading && ideas && (
                            <>
                                <Grid item xs={12} alignItems='flex-end'>
                                    <Grid container alignItems='center'>
                                        {/* <FilterComponent /> */}
                                        {/* <SearchBar /> */}
                                        {ideas.length === 0 && (
                                            <Typography>No Ideas Yet</Typography>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction='column' justifyContent='space-around' alignItems='center' spacing={3}>
                                        {ideas.map((idea) => (
                                            <IdeaDetails
                                                id={idea._id}
                                                userName={idea.username}
                                                title={idea.title}
                                                description={idea.description}
                                                likeCount={idea.likeCount}
                                                liked={idea.likedUser}
                                                vote={setIdeas}
                                                ideas={ideas}
                                            />
                                        ))}
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={3} md={4} >
                    <Suggestion />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Ideas