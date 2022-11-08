import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles/SearchResultBook.module.css'
import Image from 'next/image';
import { handleAddBook } from '../library';
import { useRouter } from 'next/router';
import { FaBook } from 'react-icons/fa'
import { GiBookCover } from 'react-icons/gi'



const SearchResultBook = ({ bookId }) => {
    const router = useRouter();
    const books = useSelector(state => state).searchResultBooks;
    const book = books.find(b => b.googlebooks_id === bookId);
    const dispatch = useDispatch();
    const userUid = useSelector((state) => state)?.user?.user?.uid;
    const [bookAdded, setBookAdded] = useState(false);


    // const [newBookState, setNewBookState] = useState({
    //     title: book.volumeInfo.title,
    //     author: book.volumeInfo.authors?.join(', '),
    //     pages: book.volumeInfo.pageCount,
    //     published: book.volumeInfo.publishedDate,
    //     description: book.volumeInfo.description,
    //     smallThumbnailLink: book.volumeInfo?.imageLinks?.smallThumbnail,
    //     thumbnailLink: book.volumeInfo?.imageLinks?.thumbnail,
    // })

    const handleNavigate = (e) => {
        e.stopPropagation();
        router.push(`/searchbooks/${book.googlebooks_id}`);

    }

    const addBook = e => {
        handleAddBook(e, book, dispatch, userUid);
        setBookAdded(true);
    }

    return (
        <>
            {book && <div className={styles.bookContainer} onClick={handleNavigate}>
                {book.smallThumbnailLink ?
                    <Image src={book.smallThumbnailLink} width="128" height="200" alt={`The book ${book.title}`} className={styles.image} />
                    :
                    <div className={styles.imageReplacer}>
                        <GiBookCover className={styles.bookIcon} />
                    </div>

                }
                <div className={styles.textAndButtonContainer}>
                    <div className={styles.textContainer}>
                        <p className={styles.titleText}>{book.title}</p>
                        <p className={styles.authorText}>{book.author}</p>
                        {/* <p>Published: {book.published}</p> */}
                        {/* <p>Pages: {book.pages}</p>  */}
                        {book.description && <p className={styles.descriptionText}>{book.description }</p>} 
                    </div>
                    {bookAdded ? 'This book has been added' : <button onClick={(e) => addBook(e)} className={styles.addBookButton}>Add book</button>}
                </div>
            </div>}
        </>
    )
}

export default SearchResultBook