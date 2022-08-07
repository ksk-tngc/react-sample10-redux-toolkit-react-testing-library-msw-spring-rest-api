import { FC, memo } from 'react'
import { LoginMain } from '../organisms/LoginMain'
import styles from './css/LoginTop.module.css'

/**
 * ログイン/サインアップ画面
 */
export const LoginTop: FC = memo(() => {
  return (
    <div className={styles.container}>
      <LoginMain />
    </div>
  )
})
