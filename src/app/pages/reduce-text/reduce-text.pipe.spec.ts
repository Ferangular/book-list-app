import {ReduceTextPipe} from './reduce-text.pipe';

describe('ReduceTextPipe', () => {

  let pipe: ReduceTextPipe;

  beforeEach(() => {
    pipe = new ReduceTextPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('use transform correctly', () => {
    const text = 'Hello this is a test to check the pipe';
    const newText = pipe.transform(text, 5);
    expect(newText.length).toBe(5);
  });

  it('debería cortar el texto al número de caracteres especificado', () => {
    const texto = 'Angular testing';
    const resultado = pipe.transform(texto, 7);
    expect(resultado).toBe('Angular');
  });

  it('debería retornar el texto completo si la longitud es mayor que la del texto', () => {
    const texto = 'Angular';
    const resultado = pipe.transform(texto, 10);
    expect(resultado).toBe('Angular');
  });

});
