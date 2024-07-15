import {NavComponent} from './nav.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

class ComponentTestRoute {
}

const routerMock = {
  navigate: jasmine.createSpy('navigate')
}

describe(NavComponent.name, () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {path: 'home', component: ComponentTestRoute},
          {path: 'cart', component: ComponentTestRoute}
        ])
      ],
      declarations: [
        NavComponent
      ],
      providers: [
        // {
        //     provide: Router, useValue: routerMock
        // }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // it('should create an instance', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should navigate to home', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navTo('home');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });


  it('should navigate to cart', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navTo('cart');
    expect(router.navigate).toHaveBeenCalledWith(['/cart']);
  });


  it('should navigate to path', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');
    component.navTo('home');
    expect(spy).toHaveBeenCalledWith(['/home']);
    component.navTo('cart');
    expect(spy).toHaveBeenCalledWith(['/cart']);
  });

  it('should navigate', () => {
    const router = TestBed.inject(Router);

    const spy = spyOn(router, 'navigate');

    component.navTo('');

    expect(spy).toHaveBeenCalled();

  });

  // it('should navigate to the correct route using mock', () => {
  //   component.navTo('home');
  //   expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  // });
});
