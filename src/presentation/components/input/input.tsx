import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import Context from '@/presentation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setState({
      ...state,
      values: {
        ...state.values,
        [props.name]: value
      }
    })
  }

  return (
    <div className={Styles.formControl}>
      <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange} />

      <div data-testid={`${props.name}-error`}>
        {!!state.inputErrors[props.name] && (
          <div className={Styles.error}>
            {state.inputErrors[props.name]}
          </div>
        )}
      </div>
    </div>
  )
}
export default Input
