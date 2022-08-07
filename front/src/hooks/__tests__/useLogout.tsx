import { act, renderHook } from '@testing-library/react'
import { LOCAL_STORAGE_KEYS } from '../../features/login/slice/loginSlice'
import { useLogout } from '../useLogout'

/**
 * window.location.href を Mock 化
 *  - location オブジェクトを delete して href の setter/getter を Mock 化して再作成する
 *  - https://remarkablemark.org/blog/2021/04/14/jest-mock-window-location-href/
 */
// `delete` の ts(2790) 対応
// https://stackoverflow.com/questions/68896198/how-can-i-resolve-a-typescript-error-around-window-opener
// オプショナルでないプロパティを `delete` しようとすると ts(2790) エラーが発生する
// `delete (window as any).location` or
delete (window as Partial<Window>).location
window.location = {} as Location
const mockGetHref = jest.fn()
const mockSetHref = jest.fn()
Object.defineProperty(window.location, 'href', {
  set: mockSetHref, // href の setter を Mock
  get: mockGetHref, // href の getter を Mock
})

describe('カスタムフックのテスト', () => {
  describe('logout 関数', () => {
    test('LocalStorage からユーザーIDが削除されること', async () => {
      // カスタムフックをレンダリング
      const { result } = renderHook(() => useLogout())
      // ログアウト処理実行
      act(() => result.current.logout())
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.LOGIN_USER_ID)).toBeNull()
    })

    test('ログインページに遷移すること', async () => {
      // カスタムフックをレンダリング
      const { result } = renderHook(() => useLogout())
      // ログアウト処理実行
      act(() => result.current.logout())
      expect(mockSetHref).toHaveBeenCalledWith('/')
    })
  })
})
