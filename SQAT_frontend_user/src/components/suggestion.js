import React, { useState } from 'react'
import { Button, Typography, TextField, Grid } from '@material-ui/core'
import axios from 'axios'

function Suggestion() {
    const initialValues = {
        title: "", description: ""
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    const addIdea = async (formValues) => {
        axios.post('https://aafd-197-156-86-67.eu.ngrok.io/ideas', formValues)
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
            username: "test_user",
            formValues
        })
        // navigate('/elections')
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
                    onSubmit={handleSubmit}
                >Post</Button>
            </Grid>
            {/* <Typography>side</Typography> */}
        </Grid>
    )
}

export default Suggestion