import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { useHistory } from 'react-router-dom'
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';

import AuthWrapper from './../AuthWrapper'
import FormInput from './../forms/FormInput'
import Button from './../forms/Button'

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    
    const disptach = useDispatch();
    const history = useHistory();

    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (resetPasswordSuccess) {
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        disptach(resetPasswordStart({ email }));
    }

    const configAuthWrapper = {
        headline: 'Reset password'
    };
    
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className='formWrap'>

                {errors.length > 0 && (
                    <ul>
                        {errors.map((e, index) => {
                            return (
                                <li key={index}> 
                                    {e}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleSubmit}> 
                    <FormInput 
                        type = "email"
                        name = "email"
                        value = {email}
                        placeholder = 'Email'
                        handleChange = {e => setEmail(e.target.value)}
                    />

                    <Button type="submit">
                        Send email
                    </Button>
                </form>
            </div>

        </AuthWrapper>
    );
}

export default EmailPassword;
