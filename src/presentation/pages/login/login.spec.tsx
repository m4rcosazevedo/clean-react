import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import Login from './login'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Login />)
  return {
    sut
  }
}

describe('Login Component', () => {
  test('Should start with inital state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-error')
    expect(emailStatus.childElementCount).toBe(0)
    const passwordStatus = sut.getByTestId('password-error')
    expect(passwordStatus.childElementCount).toBe(0)
    /* expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('Campo obrigatório')
    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('Campo obrigatório') */
  })
})
