import additionComponent from '../src/addition'

describe("should_return_five", () => {
    it('should return a number', () => {
        const value = 2; 
        const number = additionComponent(value);
        expect(number).toEqual(5); 
    })
})