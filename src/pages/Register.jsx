import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import styles from './css.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';

const userNameRegEx = /^[a-zA-Z][a-zA-Z0-9\.\-]{1,8}[a-zA-Z0-9]$/;
const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/;

const Register = () => {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState, setFocus } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const { errors, isSubmitting } = formState;

    const onSubmit = async (data) => {
        try {
            let res = await fetch("http://localhost:3000/api/register", {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });
            res = await res.json();

            if (!res.success) {
                setErr(res.message);
                setFocus('username');
                return;
            }
            console.log(`success::\n`, res);
            navigate('/');
        } catch (error) {
            console.log(`error :: \n`, error);
        }
    }
    return (
        <div className={`${styles.wrapper} ${styles.login_wrapper}`}>
            <Typography
                variant='h4'
                gutterBottom
            >Sign Up</Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className={styles.login_container}
            >
                {err &&
                    <span
                        className={styles.error}
                        style={{ marginBottom: '1rem' }}
                    >{err}</span>
                }
                <TextField
                    variant='outlined'
                    label='username'
                    type='text'
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
                        },
                        minLength: {
                            value: 3,
                            message: "Atleast 3 char required"
                        },
                        maxLength: {
                            value: 30,
                            message: "At max 30 char allowed"
                        },
                        pattern: {
                            value: userNameRegEx,
                            message: "Invalid username"
                        }
                    })}
                    error={!!errors.username}
                    helperText={errors.username?.message}
                />

                <TextField
                    variant='outlined'
                    label='password'
                    type='password'
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: "Atleast 8 char required"
                        },

                        pattern: {
                            value: passwordRegEx,
                            message: "Invalid password"
                        }
                    })}
                />
                {
                    !!errors.password &&
                    <ul
                        style={{ marginBottom: '0.5rem' }}
                    >
                        <li className={styles.error}>Atleast 8 char long</li>
                        <li className={styles.error}>Mix of alphabet and numbers</li>
                    </ul>
                }
                <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={isSubmitting}
                    loadingPosition="end"
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Sign up
                </LoadingButton>
            </form>
            <div style={{ display: 'flex', margin: '1rem' }}>
                <Typography variant='body2'>Already have an account? </Typography>
                <Link to={'/login'}>
                    <Typography variant='subtitle2' color='primary'>. Sign in</Typography>
                </Link>
            </div>
        </div>
    )

}

export default Register