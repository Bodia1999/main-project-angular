import { CreatingNamePipe } from './creating-name.pipe';

describe('CreatingNamePipe', () => {
  it('create an instance', () => {
    const pipe = new CreatingNamePipe();
    expect(pipe).toBeTruthy();
  });
});
