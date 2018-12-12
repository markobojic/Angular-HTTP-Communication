import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('/api/readers');
  }

  getReaderById(id: number): Observable<Reader> {
    return this.http.get<Reader>(`/api/readers/${id}`)
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('/api/books');
  }

  addReader(reader: Reader): Observable<Reader> {
    return this.http.post<Reader>('/api/readers', reader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateReader(reader: Reader): Observable<void> {
    return this.http.put<void>(`/api/readers/${reader.readerID}`, reader, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteReader(readerID: number): Observable<void> {
    return this.http.delete<void>(`api/readers/${readerID}`);
  }

  getBookById(id: number): Observable<Book> {
    const headers: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'
    });

    return this.http.get<Book>(`/api/books/${id}`, {
      headers
    });
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateBook(book: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${book.bookID}`, book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`api/books/${bookID}`);
  }
}
