import React from 'react';
import styles from '../styles/SearchResultBook.module.css'
import Image from 'next/image';

const SearchResultBook = ({ book }) => {
    return (
        <div className={styles.bookContainer}>
            {book.volumeInfo?.imageLinks?.smallThumbnail ?
                <Image src={book.volumeInfo?.imageLinks?.smallThumbnail} width="128" height="200" alt={`The book ${book.volumeInfo.title}`} />
                :
                <div className={styles.imageReplacer}>
                    {book.volumeInfo.title}
                </div>

            }
            <div className={styles.bookContainer__text}>
                <p>{book.volumeInfo.title}</p>
                <p>{book.volumeInfo?.authors?.join(', ')}</p>
                <p>{book.volumeInfo.pageCount}</p>
                <p>{book.volumeInfo.language}</p>
                <p>{book.volumeInfo.publishedDate}</p>
                <button>Add book</button>
            </div>
        </div>
    )
}

export default SearchResultBook