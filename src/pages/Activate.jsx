import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import styles from './css.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { activate } from '../context';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const fullNameRegex = /^[a-zA-Z ]{3,20}$/
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/

const Activate = () => {
    const [err, setErr] = useState("");
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm({});
    const dispatch = useDispatch();
    const state = useSelector(state => state.data);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        data = { ...data, token: state.user?.token }
        console.log(data);
        try {
            let res = await fetch(`${BASE_URL}/activate`, {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });
            res = await res.json();
            console.log(res);
            if (!res.success) {
                setErr(res.message);
                return;
            }

            dispatch(activate());
            navigate('/');
        } catch (error) {
            setErr("No Internet !")
            console.log(`error :: \n`, error);
        }
    }

    useEffect(() => {
        if (!state.isLoggedIn)
            navigate('/');
    }, [])
    return (
        <div className={`${styles.wrapper} ${styles.login_wrapper}`}>
            <Typography
                variant='h4'
                gutterBottom
            >Activate</Typography>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className={styles.login_container}
            >
                {err && (<span className={styles.error}>{err}</span>)}

                <TextField
                    variant='outlined'
                    label='Full Name'
                    type='text'
                    {...register("fullName", {
                        required: {
                            value: true,
                            message: "Full Name is required"
                        },
                        minLength: {
                            value: 3,
                            message: "Name should be atleast 3 character long"
                        }, maxLength: {
                            value: 20,
                            message: "Name should be atmax 20 character long"
                        }, pattern: {
                            value: fullNameRegex,
                            message: "only alphabet is allowed"
                        }
                    })}
                    error={!!errors.fullname}
                    helperText={errors.fullname?.message}
                />
                <TextField
                    variant='outlined'
                    label='Months'
                    type='number'
                    {...register('months', {
                        required: 'No of months is required',
                        validate: {
                            checkLength: m => {
                                if (!(1 <= m && m <= 12))
                                    return "months should be between 1 to 12 "
                            }
                        }
                    })}
                    error={!!errors.months}
                    helperText={errors.months?.message}
                />
                <TextField
                    variant='outlined'
                    label='Working Day'
                    type='number'
                    {...register('weekDays', {
                        required: 'No. of Working Day is required',
                        validate: {
                            checkLength: m => {
                                if (!(1 <= m && m <= 7))
                                    return "Working Day should be between 1 to  7"
                            }
                        }
                    })}
                    error={!!errors.weekDays}
                    helperText={errors.weekDays?.message}
                />
                <LoadingButton
                    variant='contained'
                    type='submit'
                    loading={isSubmitting}
                    loadingPosition="end"
                    endIcon={<ArrowForwardIosIcon />}
                >
                    Submit
                </LoadingButton>
            </form>
        </div>
    )

}

export default Activate