import React, { useState, useEffect } from 'react';
import BooksList from '../components/BooksList';
import AddBook from '../components/AddBook';
import Router, { useRouter } from 'next/router';

// import AddBook from '../components/AddBook';

const UnReadBooks = () => {
  const [readBoolean, setReadBoolean] = useState(false)
  // const [books, setBooks] = useState('');
  // this is probably not a very efficent way of doing it, fix?
  const toggleReadBoolean = () => {
    setReadBoolean(prev => !prev)
  }

  return (
    <div>
        Reading list
        <button onClick={toggleReadBoolean}>Go to list of finished books</button>
      <AddBook />

        <BooksList readBoolean={readBoolean} />
      {/* <ReadingList readBoolean={false} /> */}
    </div>
  )
}

export default UnReadBooks