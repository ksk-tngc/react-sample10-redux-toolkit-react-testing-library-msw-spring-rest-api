import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { setupStore } from '../../../../../app/store'
import { TaskHeader } from '../TaskHeader'

/**
 * window.location.href を Mock 化
 * https://remarkablemark.org/blog/2021/04/14/jest-mock-window-location-href/
 */
// `delete` の ts(2790) 対応
// https://stackoverflow.com/questions/68896198/how-can-i-resolve-a-typescript-error-around-window-opener
// オプショナルでないプロパティを `delete` しようとすると ts(2790) エラーが発生する
// `delete (window as any).location` or
delete (window as Partial<Window>).location
// location オブジェクトを delete して href の setter/getter を Mock 化して再作成
window.location = {} as Location
const mockGetHref = jest.fn()
const mockSetHref = jest.fn()
Object.defineProperty(window.location, 'href', {
  set: mockSetHref, // href の setter を Mock
  get: mockGetHref, // href の getter を Mock
})

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={undefined} />
        </Switch>
      </BrowserRouter>
      <TaskHeader />
    </Provider>
  )
}

// 各テストケース実施前にコンポーネントをレンダリングする
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderComponent()
})

describe('コンポーネントテスト', () => {
  describe('初期表示の確認', () => {
    test('必要な要素がレンダリングされていること', async () => {
      expect(screen.getByTestId('logout-btn')).toBeInTheDocument()
      expect(screen.getByTestId('login-username')).toBeInTheDocument()
      expect(screen.getByTestId('header-title')).toBeInTheDocument()
    })

    test('文言が正しいこと', async () => {
      expect(screen.getByTestId('header-title')).toHaveTextContent(
        /^Today's Task$/
      )
    })
  })

  describe('ログアウト処理の確認', () => {
    test('ログアウトボタン押下時、ログインページに遷移すること', async () => {
      await userEvent.click(screen.getByTestId('logout-btn'))
      // MEMO: window.location.href を Mock 化しているため実際には遷移していない
      // expect(window.location.pathname).toBe('/')
      expect(mockSetHref).toHaveBeenCalledWith('/')
    })
  })
})
