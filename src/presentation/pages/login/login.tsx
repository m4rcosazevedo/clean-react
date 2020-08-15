import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Footer, LoginHeader as Header, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './login-styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/authentication'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    mainError: '',
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

    return (noError && filledFields)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || !isValidForm()) {
        return
      }

      setState({
        ...state,
        isLoading: true
      })

      const account = await authentication.auth({
        email: state.values.email,
        password: state.values.password
      })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState, validation }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className={Styles.formWrap}>

            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />

            <div className={Styles.formControl}>
              <button data-testid="submit" disabled={!isValidForm()} type="submit">Entrar</button>
            </div>

            <Link data-testid="signup" to="/signup" className={Styles.linkRegister}>
              Criar conta
            </Link>
            <FormStatus />
          </div>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
