import React from 'react'
import { logout } from '../redux/login/slices'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/LoggedInStatus.module.css'
import { selectUser } from '../redux/login/slices';



const LoggedIn = () => {
    const router = useRouter();
    const user = useSelector(selectUser);
    // const displayName = user?.displayName
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
        <div className={styles.container}>
            {user ? (<div className={styles.innerContainer}>
                {user?.photoURL && <Image src={user.photoURL} width="48" height="48" className={styles.photo} />}
                <button className={styles.logoutButton} onClick={handleLogOut}>Log out</button>
            </div>)
                :
                <Link href="/login"><button>Go to login</button></Link>
            }
        </div>
    )
}

export default LoggedIn