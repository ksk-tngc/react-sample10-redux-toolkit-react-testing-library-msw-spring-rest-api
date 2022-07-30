import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { loginAsync } from '../features/login/slice/loginSlice'

/**
 * ログインに関するカスタムフック
 */
export const useLogin = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  /**
   * ログイン処理
   */
  const login = useCallback(
    async (username: string, password: string) => {
      // MEMO: AsyncThunk は action creator なので dispatch 経由で実行可能
      const res = await dispatch(
        loginAsync({
          username,
          password,
        })
      )
      // ログイン認証成功時、タスク画面に遷移する
      // 判定方法①
      // if (asyncThunkLogin.fulfilled.match(res)) {
      //   history.push('/tasks')
      // }
      // 判定方法②
      res.meta.requestStatus === 'fulfilled' && history.push('/tasks')
    },
    [dispatch, history]
  )

  return { login }
}
