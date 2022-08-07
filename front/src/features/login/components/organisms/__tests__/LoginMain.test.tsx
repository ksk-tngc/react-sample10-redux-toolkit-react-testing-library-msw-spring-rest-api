/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { setupStore } from '../../../../../app/store'
import { server } from '../../../../../mocks/server'
import { LoginMain } from '../LoginMain'

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

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  // Redux の store を使用できるよう Provider でラップする
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginMain} />
          <Route exact path="/tasks" component={undefined} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

// 各テストケース実施前にコンポーネントをレンダリングする
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderComponent()
})

describe('ログイン画面', () => {
  describe('初期表示の確認', () => {
    test('文言・初期値が正しいこと', async () => {
      expect(screen.getByTestId('header-title')).toHaveTextContent(/^Login$/)
      expect(screen.getByTestId('username-label')).toHaveTextContent(
        /^Username$/
      )
      expect(screen.getByTestId('username-input')).toHaveValue('')
      expect(screen.getByTestId('password-label')).toHaveTextContent(
        /^Password$/
      )
      expect(screen.getByTestId('password-input')).toHaveValue('')
      expect(screen.getByTestId('login-signup-btn')).toHaveTextContent(
        /^Login$/
      )
      expect(screen.getByTestId('switch-text')).toHaveTextContent(
        /^Create Account \?$/
      )
    })
  })

  describe('画面切り替えの確認', () => {
    test('切り替えテキストクリック時、サインアップ画面に表示が切り替わり、再度クリックするとログイン画面に表示が戻ること', async () => {
      await userEvent.click(screen.getByTestId('switch-text'))
      expect(screen.getByTestId('header-title')).toHaveTextContent(/^Resistor/)
      expect(screen.getByTestId('login-signup-btn')).toHaveTextContent(
        /^Create/
      )
      expect(screen.getByTestId('switch-text')).toHaveTextContent(
        /^Back to Login$/
      )
      await userEvent.click(screen.getByTestId('switch-text'))
      expect(screen.getByTestId('header-title')).toHaveTextContent(/^Login$/)
      expect(screen.getByTestId('login-signup-btn')).toHaveTextContent(
        /^Login$/
      )
      expect(screen.getByTestId('switch-text')).toHaveTextContent(
        /^Create Account \?$/
      )
    })
  })

  describe('ログインボタンの確認', () => {
    test('ユーザー名とパスワードを両方入力した場合のみ、ログインボタンが活性になること', async () => {
      // ユーザー名のみ入力
      await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
      expect(screen.getByTestId('login-signup-btn')).toBeDisabled()
      // パスワードのみ入力
      await userEvent.clear(screen.getByTestId('username-input'))
      await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
      expect(screen.getByTestId('login-signup-btn')).toBeDisabled()
      // 両方入力
      await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
      await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
      expect(screen.getByTestId('login-signup-btn')).not.toBeDisabled()
    })

    describe('ログインボタン押下時', () => {
      test('ログイン認証に成功した場合、タスク画面に遷移すること', async () => {
        await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
        await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
        await userEvent.click(screen.getByTestId('login-signup-btn'))
        // MEMO: React Router の useHistory() を Mock 化しているため、
        // 実際は画面遷移していない（させない）
        // expect(window.location.pathname).toBe('/tasks')
        expect(mockHistoryPush).toHaveBeenCalledWith('/tasks')
      })

      test('ログイン認証に失敗した場合、タスク画面に遷移しないこと', async () => {
        // msw のレスポンスを一時的に変更
        server.use(
          rest.post('http://localhost:8080/api/v1/auth', (req, res, ctx) =>
            res(ctx.status(401))
          )
        )
        await userEvent.type(
          screen.getByTestId('username-input'),
          'INVALID_USERNAME'
        )
        await userEvent.type(
          screen.getByTestId('password-input'),
          'INVALID_PASSWORD'
        )
        await userEvent.click(screen.getByTestId('login-signup-btn'))
        expect(mockHistoryPush).not.toHaveBeenCalled()
      })
    })
  })

  describe('サインアップボタンの確認', () => {
    test('ユーザー名とパスワードを両方入力した場合のみ、サインアップボタンが活性になること', async () => {
      // サインアップ表示に切り替え
      await userEvent.click(screen.getByTestId('switch-text'))
      // ユーザー名のみ入力
      await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
      expect(screen.getByTestId('login-signup-btn')).toBeDisabled()
      // パスワードのみ入力
      await userEvent.clear(screen.getByTestId('username-input'))
      await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
      expect(screen.getByTestId('login-signup-btn')).toBeDisabled()
      // 両方入力
      await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
      await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
      expect(screen.getByTestId('login-signup-btn')).not.toBeDisabled()
    })

    test('サインアップボタン押下時、タスク画面に遷移すること', async () => {
      await userEvent.click(screen.getByTestId('switch-text'))
      await userEvent.type(screen.getByTestId('username-input'), 'USERNAME')
      await userEvent.type(screen.getByTestId('password-input'), 'PASSWORD')
      await userEvent.click(screen.getByTestId('login-signup-btn'))
      // MEMO: React Router の useHistory() を Mock 化しているため、
      // 実際は画面遷移していない（させない）
      // expect(window.location.pathname).toBe('/tasks')
      expect(mockHistoryPush).toHaveBeenCalledWith('/tasks')
    })
  })
})
