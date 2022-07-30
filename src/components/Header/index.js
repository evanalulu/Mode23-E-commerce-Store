import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom'
import { signOutUserStart } from '../../redux/User/user.actions';
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import Logo from './../../assets/logo.png';

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const { currentUser, totalCartItems } = useSelector(mapState);

    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <header className='header'>
            <div className='wrap'>
                <div className='logo'>
                    <Link to="/">
                        <img src={Logo} alt='logo'/>
                    </Link>
                </div>



                <div className='callToActions'>

                    

                    <ul>
                        {currentUser && [           
                            <li>
                            <Link to='/cart'>
                                Cart ({totalCartItems})
                            </Link>
                        </li>,
                            <li className='search'>
                                <Link to ='/search' >
                                    Search
                                </Link>
                            </li>,
                            <li>
                                <span className='logOut' onClick={() => signOut()} >
                                    Logout
                                </span>
                            </li>
                            
                        ]}

                        {!currentUser && [
                            
                                <li className='search'>
                                    <Link to ='/search' >
                                        Search
                                    </Link>
                                </li>,
                                <li>
                                    <Link to="/registration">
                                        Register
                                    </Link>
                                </li>,
                                <li>
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </li>
                        ]}
                    </ul>
                </div>
            </div>
        </header>
    );
};

Header.defaultProps = {
    currentUser: null
};

export default Header;