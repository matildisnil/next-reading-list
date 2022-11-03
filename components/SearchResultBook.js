import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../styles/SearchResultBook.module.css'
import Image from 'next/image';
import { handleAddBook } from '../library';
import { useRouter } from 'next/router';

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

    return (
        <>
        {book && <div className={styles.bookContainer} onClick={handleNavigate}>
            {book.smallThumbnailLink ?
                <Image src={book.smallThumbnailLink} width="128" height="200" alt={`The book ${book.title}`} />
                :
                <div className={styles.imageReplacer}>
                    {book.title}
                </div>

            }
            <div className={styles.bookContainer__text}>
                <p>{book.title}</p>
                <p>{book.author}</p>
                <p>{book.pages}</p>
                <p>{book.published}</p>
                {/* <p>{book.volumeInfo.title}</p>
                <p>{book.volumeInfo?.authors?.join(', ')}</p>
                <p>{book.volumeInfo.pageCount}</p>
                <p>{book.volumeInfo.language}</p>
                <p>{book.volumeInfo.publishedDate}</p> */}
                {bookAdded ? 'This book has been added' :<button onClick={(e) => handleAddBook(e, book, dispatch, userUid, setBookAdded)} className={styles.addBookButton}>Add book</button>}
            </div>
        </div>}
        </>
    )
}

export default SearchResultBook