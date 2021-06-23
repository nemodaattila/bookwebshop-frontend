import { BookPrimaryData } from './book-primary-data';

describe('LocalLibraryBookPrimaryData', () => {
  it('should create an instance', (data:any) => {
    expect(new BookPrimaryData(data)).toBeTruthy();
  });
});
