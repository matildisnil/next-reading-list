import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, query, where } from "firebase/firestore";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { loadBooks, toggleBook, removeBook } from '../redux/books/slices';
// import AddBook from './AddBook';
import { AiFillDelete } from 'react-icons/ai';
import styles from '../styles/BooksList.module.css'
import { useRouter } from 'next/router';


const BooksList = ({ readBoolean }) => {
    // const [books, setBooks] = useState('');
    // this is probably not a very efficent way of doing it, fix?
    const books = useSelector(state => state).books;
    // const userUid = useSelector(state => state).user.user.uid
    // console.log(userUid)
    const dispatch = useDispatch();
    const router = useRouter();


    const tempArray = [];
    useEffect(() => {
        // this ifstatement should probably go, a little bit dangerous. probably I should load the books higher up instead
        if (books.length === 0) {
            const q = query(collection(db, "Books")/* , where("createdBy", "==", userUid) */);
            getDocs(q)
                .then((entries) => {
                    entries.forEach(entry => {
                        tempArray.push({ ...entry.data(), id: entry.id });
                    })
                    console.log(tempArray)
                    dispatch(loadBooks(tempArray));
                    // setBooks(tempArray);
                })
                .catch(err => {
                    alert(err);
                })
        }
    }, []);

    const goToDetails = (e, id) => {
        e.stopPropagation();
        router.push(`/books/${id}`);
        
    }

    const handleCheckbox = async (uid) => {
        try {
            const index = books.findIndex(book => book.id === uid)
            const bookRef = doc(db, 'Books', uid);
            await setDoc(bookRef, { read: !books[index].read }, { merge: true });
            dispatch(toggleBook(index));
        } catch (err) {
            alert(err);
        }
    }

    const handleDelete = async (uid) => {
        try {
            const index = books.findIndex(book => book.id === uid)
            const bookRef = doc(db, 'Books', uid);
            await deleteDoc(bookRef);
            dispatch(removeBook(index));
        } catch (err) {
            alert(err);
        }
    }


    return (
        <div>
            {books.filter(book => book.read === readBoolean).map(item => {
                return (
                <div onClick={(e) => goToDetails(e, item.id)} className={styles.item} key={item.id}>
                    <input type="checkbox" checked={item.read} onChange={() => handleCheckbox(item.id)} />
                    <div className={styles.itemTextContainer}>
                        <p className="itemTitle">{item.title}</p>
                        <p>{item.author}</p>
                    </div>
                    <AiFillDelete
                        onClick={() => handleDelete(item.id)}
                        className={styles.deleteIcon}
                    />
                </div>)
            })}
      </div>
    )
}

export default BooksList

