import React from 'react';
import { useSelector } from 'react-redux';
import { selectBookState } from '../redux/books/slices';
import styles from '../styles/BooksList.module.css'
import ListBook from './ListBook';

const BooksList = ({ readBoolean }) => {
    const books = useSelector(selectBookState).filter(book => book.read === readBoolean);
    
    // if I do want state to update from the database when navigating from addbook to here, I should do this here instead
    // useEffect(() => {
    //     const tempArray = [];
    //     if (userUid /* && books.length === 0 */) {
    //         // console.log('books reloaded');
    //         const q = query(collection(db, "Books"), where("createdBy", "==", userUid), orderBy("createdAt", "desc"));
    //         getDocs(q)
    //             .then((entries) => {
    //                 entries.forEach(entry => {
    //                     tempArray.push({ ...entry.data(), createdAt: entry.data().createdAt.toString(), id: entry.id });
    //                 })
    //                 dispatch(loadBooks(tempArray));
    //             })
    //             .catch(err => {
    //                 alert(err);
    //             })
    //         // }
    //     }
    // }, [userUid]);

    return (
        <div className={styles.listContainer}>
            {books.map(item => {
                return <ListBook item={item} key={item.id} />
            })}
        </div>
    )
}

export default BooksList

