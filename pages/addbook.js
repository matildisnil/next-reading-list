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

    const submitSearch = async e => {
        e.preventDefault();
        if (!searchValue){
            alert('Please supply a search value');
            return
        }
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
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
            <div className={styles.innerContainer}>
                {!manualAddIsActive &&
                    <form className={styles.googleSearchContainer} onSubmit={submitSearch}>
                        <h2 className={styles.heading}>Add book</h2>
                        <input
                            onChange={handleSearch}
                            type="text"
                            value={searchValue}
                            placeholder="Search"
                            name="search"
                            className={styles.inputElement}
                        />
                        <input  type="submit" value="Search on Google books" className={styles.googleBooksButton}/>
                        <p className={styles.notFoundText}>Didn&apos;t find what you were looking for?</p>
                    </form>}
                {manualAddIsActive && <ManualAdd />}
                <button onClick={toggleManualAddIsActive} className={styles.manualAddButton}>
                    {manualAddIsActive ? 'Add with Google books' : 'Add manually'}
                </button>

            </div>
            <Link className={styles.backIconContainer} href="/">
                <MdArrowBack className="backIcon" />
                <p>Reading list</p>
            </Link>
            <div className={styles.booklistContainer}>
                {searchResults.length !== 0 && searchResults.map(book => <SearchResultBook key={book.googlebooks_id} bookId={book.googlebooks_id} />)}
            </div>
        </div>

    )
}

export default AddBook
