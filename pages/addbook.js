import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { addBook } from '../redux/books/slices';
import { db } from '../firebase';
import styles from '../styles/AddBook.module.css'
import SearchResultBook from '../components/SearchResultBook';

const AddBook = () => {
    const dispatch = useDispatch();
    // const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const userUid = useSelector((state) => state)?.user?.user?.uid;
    const [searchResults, setSearchResults] = useState(null);
    const [manualAddIsActive, setManualAddIsActive] = useState(false);

    const [newBookState, setNewBookState] = useState({
        title: '',
        author: '',
    });
    const [searchValue, setSearchValue] = useState('');

    const handleChange = e => {
        setNewBookState(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddBook = async () => {
        try {
            const newBook = {
                title: newBookState.title,
                author: newBookState.author,
                read: false,
                review: '',
                rating: '',
                createdBy: userUid,
                // createdAt: serverTimestamp(),
            }
            const docRef = await addDoc(collection(db, "Books"), newBook);
            // alert("Document written with ID: " + docRef.id);
            dispatch(addBook({ ...newBook, id: docRef.id }));
            setNewBookState({
                title: '',
                author: '',
            })

        } catch (err) {
            alert(err);
        }
    }

    const handleSearch = async (e) => {
        setSearchValue(e.target.value);
    }

    const submitSearch = async () => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`)
        const parsedResponse = await response.json();
        console.log(parsedResponse.items, 'hellogate');
        setSearchResults(parsedResponse.items);
        // const response = await fetch(`http://libris.kb.se/xsearch?query=${searchValue.split(' ').join('+')}&format=json`);
        // const parsedResponse = await response.json();
        // console.log(parsedResponse.xsearch.list);
    }

    const toggleManualAddIsActive = () => {
        setManualAddIsActive(prev => !prev);
    }

    return (
        <div className={styles.container}>
            <div className={styles.activeContainer}>
                <h2>Add book</h2>


                <input
                    onChange={handleSearch}
                    type="text"
                    value={searchValue}
                    placeholder="Search"
                    name="search"
                    className={styles.inputElement}
                />
                <button onClick={submitSearch} type="button" className={styles.button}>
                    Search google books
                </button>
                <p>Didn`apos;`t find what you were looking for?</p><button onClick={toggleManualAddIsActive}>Add manually</button>
                {manualAddIsActive && (<div>
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.title}
                        placeholder="Title"
                        name="title"
                        className={styles.inputElement}
                    />
                    <input
                        onChange={handleChange}
                        type="text"
                        value={newBookState.author}
                        placeholder="Author"
                        name="author"
                        className={styles.inputElement}
                    />

                    <button onClick={handleAddBook} className={styles.button}>
                        Add book
                    </button>
                </div>)}
                {searchResults && searchResults.map(book => <SearchResultBook key={book.id} book={book} />)}
            </div>

        </div>

    )
}

export default AddBook
