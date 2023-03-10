import {CalculatorService} from "./calculatorService";

describe('calculatorService', () => {
  it('should add 2 numbers', function () {
    const service = new CalculatorService();
    expect(service.add(1, 2)).toBe(3);
  });
  it('should subtract 2 numbers', function () {
    const service = new CalculatorService();
    expect(service.subtract(2, 2)).toBe(0);
  });
});
