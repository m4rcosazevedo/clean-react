import React from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './login-styles.scss'
import Logo from '@/presentation/components/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
      </header>
      <form className={Styles.form}>
        <h1>Login</h1>
        <div className={Styles.formWrap}>

          <div className={Styles.formControl}>
            <input type="email" name="email" placeholder="Digite seu e-mail"/>
          </div>
          <div className={Styles.formControl}>
            <input type="password" name="password" placeholder="Digite sua senha"/>
          </div>
          <div className={Styles.formControl}>
            <button type="submit">Entrar</button>
          </div>

          <Spinner className={Styles.spinner} />

        </div>
      </form>
      <footer className={Styles.footer}>
        2020&copy; Marcos Azevedo
      </footer>
    </div>
  )
}

export default Login
