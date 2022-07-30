import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { signUpUserStart } from './../../redux/User/user.actions';

import FormInput from './../forms/FormInput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper'

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const Signup = props => {

    const { currentUser, userErr } = useSelector(mapState);
    const history = useHistory();
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPasswird] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            reset();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPasswird('');
        setErrors([]);
    };

     const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart ({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }

    const configAuthWrapper = {
        headline: 'Sign Up'
    }

    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className='formWrap'>
                                
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            console.log('error');
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            );
                        })}
                    </ul>
                )}

                <form onSubmit={handleFormSubmit}>

                    <FormInput 
                        type = "text"
                        name = "displayName"
                        value = { displayName }
                        placeholder = "Full Name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />

                    <FormInput 
                        type = "email"
                        name = "email"
                        value = { email }
                        placeholder = "Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput 
                        type = "password"
                        name = "password"
                        value = { password }
                        placeholder = "Password"
                        handleChange={e => setPassword(e.target.value)}
                    />  

                    <FormInput 
                        type = "password"
                        name = "confirmPassword"
                        value = { confirmPassword }
                        placeholder = "Confirm Password"
                        handleChange={e => setConfirmPasswird(e.target.value)}
                    />              
                    
                    <Button>
                        Sign up
                    </Button>

                </form>
            </div>
        </AuthWrapper>
    );
}

export default Signup;