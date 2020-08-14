import { FieldValidation } from '@/validation/protocols'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string) {}

  validate (value: string): Error {
    return new InvalidFieldError()
  }
}