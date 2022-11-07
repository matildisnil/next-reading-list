import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/SearchBooksId.module.css'
import { MdArrowBack } from 'react-icons/md'
import BookDetails from '../../components/BookDetails';

const SearchBook = () => {
  const books = useSelector(state => state).searchResultBooks;
  const router = useRouter();
  const book = books.find(b => b.googlebooks_id === router.query.id);

  // const [formattedBook, setFormattedBook] = useState({ title: book.volumeInfo.title,
  //   author: book.volumeInfo.authors?.join(', '),
  //   pages: book.volumeInfo.pageCount,
  //   published: book.volumeInfo.publishedDate,
  //   description: book.volumeInfo.description,
  //   smallThumbnailLink: book.volumeInfo?.imageLinks?.smallThumbnail,
  //   thumbnailLink: book.volumeInfo?.imageLinks?.thumbnail,
  // });

  

  return (
    <div >
      <BookDetails book={book} />
      <Link href="/addbook"><MdArrowBack className={styles.bookPage__backIcon}/></Link>
    </div>
  )
}



export default SearchBook