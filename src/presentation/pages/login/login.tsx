import React, { useState } from 'react'
import { Footer, LoginHeader as Header, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './login-styles.scss'

type StateProps = {
  isLoading: boolean
  errorMessage: string
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h1>Login</h1>
          <div className={Styles.formWrap}>

            <Input type="email" name="email" placeholder="Digite seu e-mail" />
            <Input type="password" name="password" placeholder="Digite sua senha" />

            <div className={Styles.formControl}>
              <button data-testid="submit" disabled type="submit">Entrar</button>
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
