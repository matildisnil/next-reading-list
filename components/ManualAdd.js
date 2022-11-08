import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleAddBook } from '../library';
import styles from '../styles/ManualAdd.module.css'

const ManualAdd = () => {
  const dispatch = useDispatch();
  const userUid = useSelector((state) => state)?.user?.user?.uid;

  const initialNewBookState = {
    title: '',
    author: '',
    pages: '',
    published: '',
    description: '',
  }

  const [bookAdded, setBookAdded] = useState(false);


  const [newBookState, setNewBookState] = useState(initialNewBookState);

  const handleChange = e => {
    setNewBookState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleAdd = e => {
    e.preventDefault();
    if(newBookState.title.length === 0){
      alert('Please provide a title');
      return;
    }
    handleAddBook(e, newBookState, dispatch, userUid);
    alert('The book was added');
    setNewBookState(initialNewBookState);
  }

  return (
    <form onSubmit={(e) => handleAdd(e)} className={styles.container}>
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
      <input
        onChange={handleChange}
        type="text"
        value={newBookState.pages}
        placeholder="Pages"
        name="pages"
        className={styles.inputElement}
      />
      <input
        onChange={handleChange}
        type="text"
        value={newBookState.published}
        placeholder="Published"
        name="published"
        className={styles.inputElement}
      />
      <input
        onChange={handleChange}
        type="text"
        value={newBookState.description}
        placeholder="Description"
        name="description"
        className={styles.inputElement}
      />

      <input className={styles.manualAddButton} type="submit" value="Add book"/>
    </form>)
}


export default ManualAdd