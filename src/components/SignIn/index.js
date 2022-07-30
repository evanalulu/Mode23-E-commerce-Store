import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss'
import Button from './../forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../AuthWrapper';
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions';
import { Link } from 'react-router-dom'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
});

const SignIn = props => {
    
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (currentUser) {
            resetForm();       
            history.push('/');
        }
    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));

        //resetFrom();
        //props.history.push('/');
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    }
    
    const configAuthWrapper = {
        headline: 'Login'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>    
            <div className='formWrap'>
                <form onSubmit={handleSubmit}>

                    <FormInput 
                        type='email'
                        name='email'
                        value = {email}
                        placeholder = 'Email'
                        handleChange = {e => setEmail(e.target.value)}
                    />

                    <FormInput 
                        type='password'
                        name='password'
                        value = {password}
                        placeholder = 'Password'
                        handleChange = {e => setPassword(e.target.value)}
                    />

                    <Button type='submit'>
                        Login
                    </Button>

                    <div className='socialSignin'>
                        <Button onClick = {handleGoogleSignIn}>
                            Sign in with Google
                        </Button>
                    </div>

                    <div className='links'>
                        <Link to='/recovery'>
                            Forgot Password?
                        </Link>
                    </div>

                </form>
            </div>
        </AuthWrapper>
    );
}

export default SignIn;
