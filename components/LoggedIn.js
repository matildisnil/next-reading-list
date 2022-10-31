import React from 'react'
import { logout } from '../redux/login/slices'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'



const LoggedIn = () => {
    const router = useRouter();
    const user = useSelector((state) => state)?.user?.user?.email;
    const dispatch = useDispatch();
    const handleLogOut = () => {
        signOut(auth).then(() => {
            // setUser(null);
            dispatch(logout());
            router.push('/');
        }).catch(err => {
            alert(err.message);
        })
    }

    return (
        <div>
            <button onClick={handleLogOut}>Log out</button>
            <div>You are logged in as {user}</div>
        </div>
    )
}

export default LoggedIn