import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { blue, green, purple, red, yellow } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { login, loginWithMagicLink } from "../Api/auth";
import { getToken } from "../Api/axiosConfig";
import { loggedin_user } from "../RouteHandler/loggedinuser";

function Login() {
  const initialValues = { email: "", password: "" };

  const [authenticated, setAuthenticated] = useState(getToken())
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  let params = useParams();
  console.log("Params", params)
  
  useEffect(() => {
    const getUser = () => {
      const result = getToken()
      console.log("Result Local Storage", result)
      setAuthenticated(result)
      if (authenticated){
        navigate('/')
      }
    }
    // const verifyMagicLink = async () => {
    //   if (params.link) {
    //       console.log("params.link--", params.link);
    //     const response = await loginWithMagicLink(params.email, params.link);
    //     console.log(response)
    //     if (response.status === 200) {
    //       navigate('/')
    //       setAuthenticated(true)
    //     }
    //   }
    // };
    // debugger
    // verifyMagicLink();
    getUser()
  }, [authenticated, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const response = await loginWithMagicLink(formValues.email);
    // const response = await login(formValues.email, formValues.password);
    console.log("response", response);
    alert(response.message);
    // setIsSubmit(true)
    // setFormValues(initialValues)
    // navigate('/')
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const emailRegex = new RegExp("^[A-Za-z0-9]{1,64}@(.+)$");

    if (!values.email) {
      errors.email = "Email is a Required Field";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid Email Address";
    }
    // if (!values.password) {
    //     errors.password = "Password is a Required Field"
    // }
    return errors;
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.my_typography} variant="h5">
                Login{" "}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input_css}
                autoComplete="email"
                name="email"
                variant="outlined"
                fullWidth
                id="email"
                autoFocus
                value={formValues.email}
                onChange={changeHandler}
              />
              <Typography data-cy="email-error" className={classes.error}>
                {formErrors.email}
              </Typography>
            </Grid>
            {/* <Grid item xs={12}>

                            <Typography variant="subtitle1">Password</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.input_css}
                                variant="outlined"
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formValues.password}
                                onChange={changeHandler}
                            />
                            <Typography className={classes.error}>{formErrors.password}</Typography>
                        </Grid> */}
          </Grid>
          <Grid item xs={12} className={classes.submit}>
            <Button
            data-cy="login-button"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.mybutton}
            >
              Login
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    minHeight: "100vh",
    [theme.breakpoints.up("sm")]: {
      background: "#2F313D",
    },
    display: "grid",
    placeItems: "center",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "55%",
    width: "0%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "45%",
    },

    [theme.breakpoints.up("md")]: {
      width: "30%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "20%",
    },

    padding: 20,
  },

  input_css: {
    "& > *": {
      margin: theme.spacing(0.5),
      width: "100%",
      height: 35.0,
    },
  },
  my_typography: {
    fontWeight: 600,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  mybutton: {
    width: "100%",
    backgroundColor: "#00D05A",
  },
  my_confirm: {
    display: "grid",
    justifyContent: "center",
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    display: "grid",
    justifyContent: "center",
  },
  error: {
    color: "#ff0000",
    fontSize: 10,
    margin: theme.spacing(0.5),
  },
}));

export default Login;
