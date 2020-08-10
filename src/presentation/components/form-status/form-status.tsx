import React, { useContext } from 'react'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  const { mainError, isLoading } = state
  return (
    <div data-testid="error-wrap">
      {isLoading && (
        <Spinner />
      )}
      {mainError && (
        <div data-testid="main-error" className={Styles.error}>{mainError}</div>
      )}
    </div>
  )
}

export default FormStatus
