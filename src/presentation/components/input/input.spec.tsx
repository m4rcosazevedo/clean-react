import React from 'react'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'
import faker from 'faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{
      state: {
        inputErrors: {
          [fieldName]: ''
        }
      }
    }}>
      <Input name={fieldName} />
    </Context.Provider>
  )
}

const loadInput = (): HTMLInputElement => {
  const fieldName = faker.database.column()
  const sut = makeSut(fieldName)
  return sut.getByTestId(fieldName) as HTMLInputElement
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const input = loadInput()
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const input = loadInput()
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
