import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe('Login Component', () => {
  test('Should start with inital state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId('email-error')
    expect(emailStatus.childElementCount).toBe(0)
    const passwordStatus = getByTestId('password-error')
    expect(passwordStatus.childElementCount).toBe(0)
    /* expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('Campo obrigatório')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('Campo obrigatório') */
  })
})
