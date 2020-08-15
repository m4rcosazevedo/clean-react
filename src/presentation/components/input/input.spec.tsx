import React from 'react'
import { render } from '@testing-library/react'
import Input from './input'
import Context from '@/presentation/contexts/form/form-context'

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const fieldName = 'field'
    const { getByTestId } = render(
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
    const input = getByTestId(fieldName) as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
