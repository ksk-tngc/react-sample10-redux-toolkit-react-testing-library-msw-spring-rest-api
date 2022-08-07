import { act, renderHook } from '@testing-library/react'
import { rest } from 'msw'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from '../../app/store'
import { server } from '../../mocks/server'
import { useSignup } from '../useSignup'

/**
 * Redux の Provider でラップする Wrapper コンポーネント
 * https://medium.com/@szpytfire/testing-react-hooks-redux-and-jest-7f5fd2b2dad5
 */
// MEMO: React18 から FC に children が暗黙的に含まれなくなったため
// props として明示する必要がある。
const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return <Provider store={store}>{children}</Provider>
}

/**
 * カスタムフック（useLogin）を Mock 化
 */
const mockLogin = jest.fn()
jest.mock('../useLogin', () => ({
  useLogin: () => ({
    login: mockLogin,
  }),
}))

describe('カスタムフックのテスト', () => {
  describe('signup 関数', () => {
    /**
     * signup 関数実行処理をまとめる
     */
    const execSignup = async (username: string, password: string) => {
      // カスタムフックをレンダリング
      // MEMO: useSignup は Redux を使用しているため Provider でラップする必要がある。
      const { result } = renderHook(() => useSignup(), {
        wrapper: Wrapper,
      })
      // サインアップ処理実行
      await act(() => result.current.signup(username, password))
    }

    test('サインアップ成功時、ログイン処理が実行されること', async () => {
      const params: Parameters<typeof execSignup> = ['NAME', 'PASS']
      await execSignup(...params)
      expect(mockLogin).toHaveBeenCalledWith(...params)
    })

    test('サインアップ失敗時、ログイン処理が実行されないこと', async () => {
      // msw のレスポンスを一時的に変更
      server.use(
        rest.post('http://localhost:8080/api/v1/users', (req, res, ctx) =>
          res(ctx.status(500))
        )
      )
      const params: Parameters<typeof execSignup> = ['NAME', 'PASS']
      await execSignup(...params)
      expect(mockLogin).not.toHaveBeenCalled()
    })
  })
})
