import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { errorMessage, isLoading } = state
  return (
    <div data-testid="error-wrap">
      {isLoading && (
        <Spinner />
      )}
      {errorMessage && (
        <div className={Styles.error}>{errorMessage}</div>
      )}
    </div>
  )
}

export default FormStatus
