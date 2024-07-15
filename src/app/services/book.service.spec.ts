import {BookService} from './book.service';
import {Book} from '../models/book.model';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {environment} from '../../environments/environment';
import swal from 'sweetalert2';

const listBook: Book[] = [
  {
    id: '1',
    name: 'Book 1',
    author: 'Author 1',
    isbn: '123',
    price: 15,
    amount: 2
  },
  {
    id: '2',
    name: 'Book 2',
    author: 'Author 2',
    isbn: '456',
    price: 20,
    amount: 1
  },
  {
    id: '3',
    name: 'Book 3',
    author: 'Author 3',
    isbn: '789',
    price: 8,
    amount: 7
  }
];

const book: Book = {
  id: '1',
  name: 'Book 1',
  author: 'Author 1',
  isbn: '123',
  price: 15,
  amount: 2
};

xdescribe(BookService.name, () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  let storage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        BookService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);

    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return storage[key] ? storage[key] : null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return storage[key] = value;
    });
  });

  afterAll(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getBook return a list of book and does a get method', () => {
    service.getBooks().subscribe((resp: Book[]) => {
      console.log(resp);
      expect(resp).toEqual(listBook);
    });
    const req = httpMock.expectOne(environment.API_REST_URL + '/book');
    expect(req.request.method).toBe('GET');
    req.flush(listBook); // simulate success response from the server
  });

  it('getBooksFromCart return empty array when localStorage is empty', () => {
    // tslint:disable-next-line:no-shadowed-variable
    const listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });


  it('addBookToCart add a book successfully when the list does not exist in the localStorage', () => {
    const toast = { fire: () => null } as any;
    const spy1 = spyOn(swal, 'mixin').and.callFake(() =>    toast);

    // tslint:disable-next-line:no-shadowed-variable
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);

    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    // expect(listBook.length).toBe(1); // cuando se agrega el primer libro
    service.addBookToCart(book);
    expect(spy1).toHaveBeenCalled();
  });


  it('removeBooksFromCart removes the list from the localStorage', () => {
    service.addBookToCart(book);
    // tslint:disable-next-line:no-shadowed-variable
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });

  /*
  public updateAmountBook(book: Book): Book[] {
  const listBookCart = this.getBooksFromCart();
  const index = listBookCart.findIndex((item: Book) => {
    return book.id === item.id;
  });
  if (index !== -1) {
    listBookCart[index].amount = book.amount;
    if (book.amount === 0) {
      listBookCart.splice(index, 1);
    }
  }
  localStorage.setItem('listCartBook', JSON.stringify(listBookCart));
  return listBookCart;
}
   */

  afterEach(() => {
    localStorage.clear();
  });

  it('should update the amount of a book in the cart', () => {
    const book: Book = {
      id: '1',
      name: 'Book 1',
      author: 'Author 1',
      isbn: '123',
      price: 15,
      amount: 1
    };
    const updatedBook: Book = {
      id: '1',
      name: 'Book 1',
      author: 'Author 1',
      isbn: '123',
      price: 15,
      amount: 3
    };

    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(1);

    service.updateAmountBook(updatedBook);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);
    expect(listBook[0].amount).toBe(3);
  });

  it('should remove the book from the cart if amount is zero', () => {
    const book: Book = {
      id: '1',
      name: 'Book 1',
      author: 'Author 1',
      isbn: '123',
      price: 15,
      amount: 1
    };
    const updatedBook: Book = {
      id: '1',
      name: 'Book 1',
      author: 'Author 1',
      isbn: '123',
      price: 15,
      amount: 0
    };

    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(1);

    service.updateAmountBook(updatedBook);
    listBook = service.getBooksFromCart();
    expect(listBook.length).toBe(0);
  });
});
