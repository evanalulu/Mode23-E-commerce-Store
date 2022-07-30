import React from 'react';
import { Link } from 'react-router-dom';
import { checkUserIsAdmin } from './../../Utils'
import { useSelector } from 'react-redux';
import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const AdminTool = props => {

    const { currentUser} = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);
    if (!isAdmin) return null;

    return (
        <div className='adminTool'>
            <ul>
                <li>
                    <Link to='/admin'>
                        Admin
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AdminTool;
