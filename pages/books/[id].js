import React from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Book = () => {
  const books = useSelector(state => state).books;
  const router = useRouter();
  const book = books.find(b => b.id === router.query.id);


  return (
    <div>
      <p>{book.title}</p>
      <p>{book.author}</p>
    </div>
  )
}

export default Book