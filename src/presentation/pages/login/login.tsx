import React, { useState, useEffect } from 'react'
import { Footer, LoginHeader as Header, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    values: {
      email: '',
      password: ''
    },
    inputErrors: {
      email: '',
      password: ''
    }
  })

  const isValidForm = (): boolean => {
    const noError = !Object.values(state.inputErrors).map((error) => !!error).includes(true)
    const filledFields = !Object.values(state.values).map((error) => !!error).includes(false)

    return !(noError && filledFields)
  }

  useEffect(() => {
    setState({
      ...state,
      inputErrors: {
        ...state.inputErrors,
        email: validation.validate('email', state.values.email)
      }
    })
  }, [state.values.email])

  useEffect(() => {
    setState({
      ...state,
      inputErrors: {
        ...state.inputErrors,
        password: validation.validate('password', state.values.password)
      }
    })
  }, [state.values.password])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
  }

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={Styles.formWrap}>

            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />

            <div className={Styles.formControl}>
              <button data-testid="submit" disabled={isValidForm()} type="submit">Entrar</button>
            </div>

            <div className={Styles.linkRegister}>
              Criar conta
            </div>
            <FormStatus />
          </div>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
