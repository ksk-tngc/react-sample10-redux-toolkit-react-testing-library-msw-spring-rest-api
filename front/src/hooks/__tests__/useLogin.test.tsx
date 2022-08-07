import { act, renderHook } from '@testing-library/react'
import { rest } from 'msw'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from '../../app/store'
import { server } from '../../mocks/server'
import { useLogin } from '../useLogin'

// React Router の一部（useHistory）を Mock
// https://stackoverflow.com/questions/58524183/how-to-mock-history-push-with-the-new-react-router-hooks-using-jest
const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  // `jest.requireActual()` を使用して元のモジュールを取得
  ...jest.requireActual('react-router-dom'),
  // `useHistory()` のみ Mock する
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

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

describe('カスタムフックのテスト', () => {
  describe('login 関数', () => {
    test('ログイン成功時、タスクページに遷移すること', async () => {
      // カスタムフックをレンダリング
      // MEMO: useLogin は Redux を使用しているため Provider でラップする必要がある。
      const { result } = renderHook(() => useLogin(), {
        wrapper: Wrapper,
      })
      // ログイン処理実行
      await act(() => result.current.login('USERNAME', 'PASSWORD'))
      expect(mockHistoryPush).toHaveBeenCalledWith('/tasks')
    })

    test('ログイン失敗時、タスクページに遷移しないこと', async () => {
      // msw のレスポンスを一時的に変更
      server.use(
        rest.post('http://localhost:8080/api/v1/auth', (req, res, ctx) =>
          res(ctx.status(401))
        )
      )
      // カスタムフックをレンダリング
      // MEMO: useLogin は Redux を使用しているため Provider でラップする必要がある。
      const { result } = renderHook(() => useLogin(), {
        wrapper: Wrapper,
      })
      // ログイン処理実行
      await act(() =>
        result.current.login('INVALID_USERNAME', 'INVALID_PASSWORD')
      )
      expect(mockHistoryPush).not.toHaveBeenCalled()
    })
  })
})
