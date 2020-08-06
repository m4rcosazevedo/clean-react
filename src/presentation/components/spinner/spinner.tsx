import React from 'react'
import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLDivElement>

const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div className={[Styles.spinner, props.className].join(' ')}>Loading...</div>
  )
}
export default Spinner
