import { useCallback } from 'react'
import { useAppDispatch } from '../app/hooks'
import { registerUserAsync } from '../features/login/slice/loginSlice'
import { useLogin } from './useLogin'

/**
 * サインアップに関するカスタムフック
 */
export const useSignup = () => {
  const dispatch = useAppDispatch()
  const { login } = useLogin()

  /**
   * サインアップ処理
   */
  const signup = useCallback(
    async (username: string, password: string) => {
      // MEMO: AsyncThunk は action creator なので dispatch 経由で実行可能
      const res = await dispatch(
        registerUserAsync({
          username,
          password,
        })
      )

      // Async Thunk (非同期処理によるAPI呼び出し) が成功したかの判定は以下のように記述する
      // 書き方①
      // if (registerUserAsync.fulfilled.match(res)) {
      // }
      // 書き方②
      if (res.meta.requestStatus === 'fulfilled') {
        // サインアップに成功したらログインする
        await login(username, password)
      }
    },
    [dispatch, login]
  )

  return { signup }
}
