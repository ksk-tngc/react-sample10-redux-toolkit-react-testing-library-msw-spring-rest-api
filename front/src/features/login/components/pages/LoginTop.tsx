import { FC, memo } from 'react'
import styles from '../../css/LoginTop.module.css'
import { LoginMain } from '../organisms/LoginMain'

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
