import React, { memo } from 'react'
import { Logo } from '@/presentation/components'
import Styles from './login-header-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

const LoginHeader: React.FC<Props> = (props: Props) => {
  return (
    <header className={Styles.header}>
      <Logo />
    </header>
  )
}
export default memo(LoginHeader)
