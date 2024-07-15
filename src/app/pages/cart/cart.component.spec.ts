import {CartComponent} from './cart.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book.model';
import {By} from '@angular/platform-browser';
import {of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

// Declaración de manera global
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
    price: 5,
    amount: 7
  }
];

const MatDialogMock = {
  open() {
    return {
      afterClosed: () => of(true)
    };
  }
};

describe(CartComponent.name, () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let service: BookService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        CartComponent
      ],
      providers: [
        BookService,
        {provide: MatDialog, useValue: MatDialogMock}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });


  /*
    ngOnInit(): void {
    this.listCartBook = this._bookService.getBooksFromCart();
    this.totalPrice = this.getTotalPrice(this.listCartBook);
  }
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = fixture.debugElement.injector.get(BookService);
    spyOn(service, 'getBooksFromCart').and.callFake(() => listBook); // Realizado para simular el onInit
  });


  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
  /*
  public getTotalPrice(listCartBook: Book[]): number {
      let totalPrice = 0;
      listCartBook.forEach((book: Book) => {
        totalPrice += book.amount * book.price;
      });
      return totalPrice;
    }
  */

  it('getTotalPrice return an amount', () => {
    const totalPrice = component.getTotalPrice(listBook);
    // Podemos poner todas la combinaciones que queramos.
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBeNull();
  });


  /*
  hay que crear tanto espia como pruebas unitarios
    public onInputNumberChange(action: string, book: Book): void {
     const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
     book.amount = Number(amount);
     this.listCartBook = this._bookService.updateAmountBook(book); // spy1
     this.totalPrice = this.getTotalPrice(this.listCartBook); // spy2
   }

   */

  it('onInputNumberChange increments correctly', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 2
    };
    const action = 'plus';
// creación espia y esimportante el orden de creación y mockeado de los metodos
    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    // const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => { return [];  }); // ejemplo
    //   Creamos un nuevo spy2 para   this.totalPrice = this.getTotalPrice(this.listCartBook);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);

    expect(book.amount).toBe(2);

    component.onInputNumberChange(action, book);

    expect(book.amount === 3).toBeTrue();

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange decrements correctly', () => {
    const book: Book = {
      name: '',
      author: '',
      isbn: '',
      price: 15,
      amount: 3
    };
    const action = 'minus';
    expect(book.amount).toBe(3);

    // creación espia y esimportante el orden de creación y mockeado de los metodos
    const spy1 = spyOn(service, 'updateAmountBook').and.callFake(() => null);
    const spy2 = spyOn(component, 'getTotalPrice').and.callFake(() => null);


    component.onInputNumberChange(action, book);

    expect(book.amount).toBe(2);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  /*
    public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) {
      this._clearListCartBook();
    } else {
       console.log('No books available');
    }
  }

    private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  }
   */

  // El método publico es que tiene que llamar al método privado
  it('onClearBooks works correctly', () => {
    // no se recomiendo la siguiente manera, pero es la unica que hay para realizarlo a métodos privados
    const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough();
    const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
    component.listCartBook = listBook;
    component.onClearBooks();

    expect(component.listCartBook.length).toBe(0);
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();

  });

// forma poca recomendada
  it('_clearListCartBook works correctly', () => {
    const spy = spyOn(service, 'removeBooksFromCart').and.callFake(() => null);
    component.listCartBook = listBook;
    component["_clearListCartBook"](); // Forma poco recomendada

    expect(component.listCartBook.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });



  //     Sección integración
  it('should the title "the cart is empty" is not displayed when there is a list', () => {
    component.listCartBook = listBook;
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeFalsy();
  });


  fit('the title "the cart is empty" is displayed when there is empty', () => {
    component.listCartBook = [];
    fixture.detectChanges();
    const debugElement: DebugElement = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(debugElement).toBeTruthy();
    if (debugElement) {
      const element: HTMLElement = debugElement.nativeElement;
      expect(element.innerHTML).toContain('The cart is empty');
    }
  });


});
