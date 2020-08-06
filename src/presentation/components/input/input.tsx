import React from 'react'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.formControl}>
      <input {...props} />
      <div className={Styles.error}>Campo obrigatório</div>
    </div>
  )
}
export default Input
