import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addBook } from '../redux/books/slices';
import { db } from '../firebase';
import styles from '../styles/AddBook.module.css'
import SearchResultBook from '../components/SearchResultBook';
import { handleAddBook } from '../library';
import { addSearchResultBooks } from '../redux/searchResultBooks/slices';
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link';
import ManualAdd from '../components/ManualAdd';

const AddBook = () => {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    // const userUid = useSelector((state) => state)?.user?.user?.uid;
    // const [searchResults, setSearchResults] = useState(null);
    const searchResults = useSelector((state) => state)?.searchResultBooks;
    const [manualAddIsActive, setManualAddIsActive] = useState(false);

    // const [newBookState, setNewBookState] = useState({
    //     title: '',
    //     author: '',
    //     pages: '',
    //     published: '',
    //     description: '',
    // });
    const [searchValue, setSearchValue] = useState('');

    // const handleChange = e => {
    //     setNewBookState(prev => ({
    //         ...prev,
    //         [e.target.name]: e.target.value
    //     }))
    // }

    const handleSearch = async (e) => {
        setSearchValue(e.target.value);
    }

    const submitSearch = async () => {
        console.log('am i getting here?')
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
        console.log('am i getting here too?')
        const parsedResponse = await response.json();
    
        // setSearchResults(parsedResponse.items);
        const formattedBooks = parsedResponse.items.map(book => {
            return {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors?.join(', ') || '',
                pages: book.volumeInfo.pageCount || '',
                published: book.volumeInfo.publishedDate || '',
                description: book.volumeInfo?.description || '',
                smallThumbnailLink: book.volumeInfo?.imageLinks?.smallThumbnail || '',
                thumbnailLink: book.volumeInfo?.imageLinks?.thumbnail || '',
                googlebooks_id: book.id,
            }
        })
        dispatch(addSearchResultBooks(formattedBooks));
    }

    const toggleManualAddIsActive = () => {
        setManualAddIsActive(prev => !prev);
    }

    return (
        <div className={styles.container}>
            <Link href="/"><MdArrowBack className="backIcon" /></Link>

            <div className={styles.innerContainer}>
                <h2>Add book</h2>
                <input
                    onChange={handleSearch}
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    name="search"
                    className={styles.inputElement}
                />
                <button onClick={submitSearch} type="button" className={styles.googleBooksButton}>
                    Search google books
                </button>
                <p>Didn&apos;t find what you were looking for?</p>
                <button onClick={toggleManualAddIsActive} className={styles.manualAddButton}>Add manually</button>
                {manualAddIsActive && <ManualAdd />}
            </div>
            {searchResults.length !== 0 && searchResults.map(book => <SearchResultBook key={book.googlebooks_id} bookId={book.googlebooks_id} />)}

        </div>

    )
}

export default AddBook
