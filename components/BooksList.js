import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc, query, where } from "firebase/firestore";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { loadBooks, toggleBook, removeBook } from '../redux/books/slices';
// import AddBook from './AddBook';
import styles from '../styles/BooksList.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { GiBookCover } from 'react-icons/gi'


const BooksList = ({ readBoolean }) => {
    // const [books, setBooks] = useState('');
    // this is probably not a very efficent way of doing it, fix?
    const books = useSelector(state => state).books;
    const userUid = useSelector(state => state)?.user?.user?.uid
    // console.log(userUid)
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        const tempArray = [];
        // this ifstatement should probably go, a little bit dangerous. probably I should load the books higher up instead
        // if (books.length === 0) {
        if (userUid) {
            const q = query(collection(db, "Books"), where("createdBy", "==", userUid));
            getDocs(q)
                .then((entries) => {
                    entries.forEach(entry => {
                        tempArray.push({ ...entry.data(), id: entry.id });
                    })
                    dispatch(loadBooks(tempArray));
                    // setBooks(tempArray);
                })
                .catch(err => {
                    alert(err);
                })
            // }
        }
    }, [userUid]);

    const goToDetails = (e, id) => {
        e.stopPropagation();
        router.push(`/books/${id}`);

    }

    const handleCheckbox = async (e, uid) => {
        e.stopPropagation();
        try {
            const index = books.findIndex(book => book.id === uid)
            const bookRef = doc(db, 'Books', uid);
            await setDoc(bookRef, { read: !books[index].read }, { merge: true });
            dispatch(toggleBook(index));
        } catch (err) {
            alert(err);
        }
    }

    const handleDelete = async (e, uid) => {
        e.stopPropagation();
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
                    <div onClick={(e) => goToDetails(e, item.id)} className={styles.book} key={item.id}>
                        <input type="checkbox" defaultChecked={item.read} onClick={(e) => handleCheckbox(e, item.id)} className={styles.checkbox} />


                        <div className={styles.bookTextContainer}>
                            <p className={styles.itemTitle}>{item.title}</p>
                            <p className={styles.itemAuthor}>{item.author}</p>
                        </div>
                        {/* <AiFillDelete
                            onClick={(e) => handleDelete(e, item.id)}
                            className={styles.deleteIcon}
                        /> */}
                       {item.smallThumbnailLink ?
                            <Image src={item.smallThumbnailLink} width="64" height="100" alt={`the book ${item.title}`} />
                            :
                            <div className={styles.imageReplacer}><GiBookCover className={styles.bookIcon}/></div>
                        }

                    </div>)
            })}
        </div>
    )
}

export default BooksList

