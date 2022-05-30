import React, { useState, useEffect } from 'react'
import { Button, Typography, TextField, Grid } from '@material-ui/core'
import axios, { getToken } from '../Api/axiosConfig'
import { loggedin_user } from '../RouteHandler/loggedinuser'
import { useNavigate } from 'react-router-dom'

function Suggestion() {
    const [user, setUser] = useState()
    const payload = loggedin_user()
    const token = getToken()
    const navigate = useNavigate()

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
                }
                setUser(result.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [payload.id, token])

    const initialValues = {
        title: "", description: ""
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const addIdea = async (formValues) => {
        console.log(formValues)
        axios.post('/ideas', formValues, {
            headers: {
                Authorization: 'Bearer ' + token  //the token is a variable which holds the token
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const validate = (values) => {
        const errors = {}

        if (!values.title) {
            errors.title = "Title is required"
        }
        if (!values.description) {
            errors.description = "Description is required"
        } else if (values.description.length > 250) {
            errors.description = "Description cant exceed 250 characters"
        } else if (values.description.length < 50) {
            errors.description = "Description cant be smaller than 50 characters"
        }
        return errors
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
        await addIdea({
            username: user.name + " " + user.fname,
            ...formValues
        })
        navigate('/auth/ideas')
        setFormValues(initialValues)
    }

    return (
        <Grid container direction='column' justifyContent='center' spacing={1}>
            <Grid item xs={12} >
                <Typography variant='h6'>Suggest an idea</Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="body2">Write a paragraph of the idea you want to see impemented</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item xs={12} >
                    <TextField
                        id="standard-textarea"
                        // label="Multiline Placeholder"
                        placeholder="Write the title here..."
                        multiline
                        fullWidth
                        style={{ borderStyle: "dashed", borderColor: "black" }}
                        name='title'
                        value={formValues.title}
                        onChange={changeHandler}
                    />
                    <Typography variant="caption">{formErrors.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-textarea"
                        // label="Multiline Placeholder"
                        placeholder="Write your suggestions here..."
                        multiline
                        fullWidth
                        rows={10}
                        name='description'
                        value={formValues.description}
                        onChange={changeHandler}
                    />
                    <Typography variant="caption">{formErrors.description}</Typography>
                </Grid>
                <Grid item xs={12} >
                    <Button fullWidth variant="contained"
                        type='submit'
                        style={{
                            borderRadius: 5,
                            color: "#fff",
                            backgroundColor: "#00D05A",
                            padding: "18px 36px",
                            fontSize: "18px"
                        }}
                    >Post</Button>
                </Grid>
            </form>
            {/* <Typography>side</Typography> */}
        </Grid>
    )
}

export default Suggestion