import React, { memo } from 'react'
import Styles from './footer-styles.scss'

const Footer: React.FC = () => {
  return (
    <footer className={Styles.footer}>
      2020&copy; Marcos Azevedo
    </footer>
  )
}
export default memo(Footer)
