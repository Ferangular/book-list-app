import {HomeComponent} from './home.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BookService} from '../../services/book.service';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Pipe, PipeTransform} from '@angular/core';
import {of} from 'rxjs';
import {Book} from '../../models/book.model';

const listBook: Book[] = [
  {
    name: '',
    author: '',
    isbn: '',
    price: 15,
    amount: 2
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 20,
    amount: 1
  },
  {
    name: '',
    author: '',
    isbn: '',
    price: 8,
    amount: 7
  }
];

const bookServiceMock = {
  getBooks: () => of(listBook),
};

@Pipe({name: 'reduceText'})
class ReduceTextPipeMock implements PipeTransform {
  transform(): string {
    return '';
  }
}


xdescribe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        HomeComponent,
        ReduceTextPipeMock
      ],
      providers: [
        {provide: BookService, useValue: bookServiceMock},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get books', () => {
    expect(component.listBook).toEqual(listBook);
  });


  /*
    public getBooks(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => { // take(1) se subscribe una vez
      this.listBook = resp;
    });
  }
   */
  it('getBook get books from the subscription', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    // const listbook: Book[] = [];
    // const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listbook));
    component.getBooks();
    // expect(spy1).toHaveBeenCalled();
    expect(component.listBook.length).toBe(3);
  });

});
