import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Login from './login'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/test'
import { InvalidCredencialsError } from '@/domain/erros'

import faker from 'faker'
import 'jest-localstorage-mock'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const history = createMemoryHistory({ initialEntries: ['/login'] })
const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(
    <Router history={history}>
      <Login validation={validationSpy} authentication={authenticationSpy} />
    </Router>
  )

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  fireEvent.input(sut.getByTestId('email'), { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  fireEvent.input(sut.getByTestId('password'), { target: { value: password } })
}

const testStatusForField = (sut: RenderResult, fieldName: string, errorMessage?: string): void => {
  const status = sut.getByTestId(fieldName)
  if (errorMessage) {
    expect(status.childNodes[0].textContent).toBe(errorMessage)
  } else {
    expect(status.childElementCount).toBe(0)
  }
}
const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el).toBeTruthy()
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

const testValidationWithCorrectField = (sut: RenderResult, validationSpy: ValidationSpy, fieldName: string, fieldValue: string): void => {
  expect(validationSpy.fieldName).toEqual(fieldName)
  expect(validationSpy.fieldValue).toEqual(fieldValue)
}

describe('Login Component', () => {
  afterEach(cleanup)
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should start with initial state', () => {
    const { sut } = makeSut()
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, 'submit', true)
    testStatusForField(sut, 'email-error')
    testStatusForField(sut, 'password-error')
  })

  test('Should call validation with correct email', () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    populateEmailField(sut, email)
    testValidationWithCorrectField(sut, validationSpy, 'email', email)
  })

  test('Should call validation with correct password', () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    populatePasswordField(sut, password)
    testValidationWithCorrectField(sut, validationSpy, 'password', password)
  })

  test('Should show email error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populateEmailField(sut)
    testStatusForField(sut, 'email-error', errorMessage)
  })

  test('Should show password error if Validation fails', () => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.random.words()
    validationSpy.errorMessage = errorMessage
    populatePasswordField(sut)
    testStatusForField(sut, 'password-error', errorMessage)
  })

  test('Should show valid email if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    testStatusForField(sut, 'email-error')
  })

  test('Should show valid password if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordField(sut)
    testStatusForField(sut, 'password-error')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordField(sut)
    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    testElementExists(sut, 'spinner')
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication is form is invalid', async () => {
    const { sut, authenticationSpy, validationSpy } = makeSut()
    validationSpy.errorMessage = faker.random.words()
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredencialsError()
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut)
    testElementText(sut, 'main-error', error.message)
    testErrorWrapChildCount(sut, 1)
  })

  test('Should add accessToken to localstorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signUp page', async () => {
    const { sut } = makeSut()
    const register = sut.getByTestId('signup')
    fireEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
