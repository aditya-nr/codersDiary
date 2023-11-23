import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styles from './css.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../context';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [err, setErr] = useState("");
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            let res = await fetch("http://localhost:3000/api/login", {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });
            res = await res.json();

            if (!res.success) {
                setErr(res.message);
                return;
            }

            dispatch(login({ user: res }));
            navigate('/');
        } catch (error) {
            setErr("No Internet !")
            console.log(`error :: \n`, error);
        }
    }
    useEffect(() => {
        if (data.isLoggedIn)
            navigate('/');
    }, [])
    return (
        <div className={`${styles.wrapper} ${styles.login_wrapper}`}>
            <Typography
                variant='h4'
                gutterBottom
            >Login</Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className={styles.login_container}
            >
                {err && (<span className={styles.error}>{err}</span>)}

                <TextField
                    variant='outlined'
                    label='username'
                    type='text'
                    {...register("username", {
                        required: {
                            value: true,
                            message: "Username is required"
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
                        required: 'Password is required'
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={isSubmitting}
                    loadingPosition="end"
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Log in
                </LoadingButton>
            </form>
            <div style={{ display: 'flex', margin: '1rem' }}>
                <Typography variant='body2'>New user? </Typography>
                <Link to={'/register'}>
                    <Typography variant='subtitle2' color='primary'>. Sign up</Typography>
                </Link>
            </div>

        </div>
    )

}

export default Login