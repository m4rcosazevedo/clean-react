import React from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './login-styles.scss'
import Header from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header />
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
      <Footer />
    </div>
  )
}

export default Login
