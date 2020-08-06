import React from 'react'
import { Footer, LoginHeader as Header, Input, Spinner } from '@/presentation/components'
import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
      <form className={Styles.form}>
        <h1>Login</h1>
        <div className={Styles.formWrap}>

          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />

          <div className={Styles.formControl}>
            <button type="submit">Entrar</button>
          </div>

          <div className={Styles.linkRegister}>
            Criar conta
          </div>
          <Spinner className={Styles.spinner} />
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
