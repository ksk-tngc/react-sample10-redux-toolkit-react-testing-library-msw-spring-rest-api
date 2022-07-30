import { Button } from '@material-ui/core'
import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useLogin } from '../../../../hooks/useLogin'
import { useSignup } from '../../../../hooks/useSignup'
import styles from '../../css/LoginMain.module.css'
import {
  editPassword,
  editUserName,
  selectLogin,
  toggleMode,
} from '../../slice/loginSlice'

/**
 * ログイン/サインアップのメイン領域
 */
export const LoginMain: FC = memo(() => {
  const { isLoginView, inputValue } = useAppSelector(selectLogin)
  const dispatch = useAppDispatch()
  const { login } = useLogin()
  const { signup } = useSignup()

  /**
   * ログイン/サインアップボタンのハンドラー
   * 　・ログイン画面/サインアップ画面で処理を分岐
   */
  const LoginButtonHandler = async () =>
    isLoginView
      ? await login(inputValue.username, inputValue.password)
      : await signup(inputValue.username, inputValue.password)

  return (
    <div className={styles.loginMain}>
      {/* タイトル */}
      <h1 className={styles.title}>{isLoginView ? 'Login' : 'Resistor'}</h1>
      {/* ユーザー名 */}
      <div>
        <label htmlFor="username" className={styles.inputLabel}>
          Username
        </label>
        <input
          type="text"
          id="username"
          className={styles.input}
          value={inputValue.username}
          onChange={(e) => dispatch(editUserName({ value: e.target.value }))}
        />
      </div>
      {/* パスワード */}
      <div>
        <label htmlFor="password" className={styles.inputLabel}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={inputValue.password}
          onChange={(e) => dispatch(editPassword({ value: e.target.value }))}
        />
      </div>
      {/* ログイン/サインアップボタン */}
      <div className={styles.loginButtonWrapper}>
        <Button
          variant="contained"
          color="primary"
          disabled={!inputValue.username || !inputValue.password}
          onClick={LoginButtonHandler}
        >
          {isLoginView ? 'Login' : 'Create'}
        </Button>
      </div>
      {/* ログイン/サインアップ切り替えテキスト */}
      <div className={styles.switchTextWrapper}>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? 'Create Account ?' : 'Back to Login'}
        </span>
      </div>
    </div>
  )
})
