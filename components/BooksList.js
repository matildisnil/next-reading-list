import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { query, where, orderBy } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { loadBooks, selectBookState } from '../redux/books/slices';
import { selectUser } from '../redux/login/slices';
// import AddBook from './AddBook';
import styles from '../styles/BooksList.module.css'
import ListBook from './ListBook';


const BooksList = ({ readBoolean }) => {
    const books = useSelector(selectBookState).filter(book => book.read === readBoolean);
    // const books = useSelector(state => state).books.filter(book => book.read === readBoolean);
    // const userUid = useSelector(state => state)?.user?.user?.uid
    const userUid = useSelector(selectUser)?.uid;
    const dispatch = useDispatch();

    useEffect(() => {
        const tempArray = [];
        // this could possibly be the cause of hydration errors?
        if (userUid /* && books.length === 0 */) {
            // console.log('books reloaded');
            const q = query(collection(db, "Books"), where("createdBy", "==", userUid), orderBy("createdAt", "desc"));
            getDocs(q)
                .then((entries) => {
                    entries.forEach(entry => {
                        tempArray.push({ ...entry.data(), createdAt: entry.data().createdAt.toString(), id: entry.id });
                    })
                    dispatch(loadBooks(tempArray));
                })
                .catch(err => {
                    alert(err);
                })
            // }
        }
    }, [userUid]);

    return (
        <div className={styles.listContainer}>
            {books.map(item => {
                return <ListBook item={item} key={item.id} />
            })}
        </div>
    )
}

export default BooksList

