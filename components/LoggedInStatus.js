import React from 'react'
import { logout } from '../redux/login/slices'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from '../styles/LoggedInStatus.module.css'



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
        { user ? (<div className={styles.innerContainer}>
            <button className={styles.logoutButton} onClick={handleLogOut}>Log out</button>
            <div className={styles.user}>{user}</div>
        </div>)
        :
        <Link href="/">Go to login</Link>    
    }
        </div>
    )
}

export default LoggedIn