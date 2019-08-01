import { LetterToUppercasePipe } from './letter-to-uppercase.pipe';

describe('LetterToUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new LetterToUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
