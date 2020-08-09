import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { inputErrors } = useContext(Context)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.formControl}>
      <input {...props} readOnly onFocus={enableInput} />

      <div data-testid={`${props.name}-error`}>
        {!!inputErrors[props.name] && (
          <div className={Styles.error}>
            {inputErrors[props.name]}
          </div>
        )}
      </div>
    </div>
  )
}
export default Input
