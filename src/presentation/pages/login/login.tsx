import React from 'react'
import Spinner from '@/presentation/components/spinner/spinner'
import Styles from './login-styles.scss'
import Header from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'

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

          <Spinner className={Styles.spinner} />

        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
