import fake from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation(fake.database.column(), 5)
    const error = sut.validate('123')
    expect(error).toEqual(new InvalidFieldError())
  })
})
