import { useCallback } from 'react'
import { LOCAL_STORAGE_KEYS } from '../features/login/slice/loginSlice'

/**
 * ログアウトに関するカスタムフック
 */
export const useLogout = () => {
  /**
   * ログアウト処理
   */
  const logout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.LOGIN_USER_ID)
    // MEMO: location.href で飛ばすと Redux の state はクリアされる
    window.location.href = '/'
  }, [])

  return { logout }
}
