import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../../../../app/store'
import { TaskList } from '../TaskList'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskList />
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
    test('タスクの一覧が表示されていること', async () => {
      expect(
        await screen.findByText('task 1 from msw', { exact: true })
      ).toBeInTheDocument()
      expect(
        await screen.findByText('task 2 from msw', { exact: true })
      ).toBeInTheDocument()
      expect(
        await screen.findByText('task 3 from msw', { exact: true })
      ).toBeInTheDocument()
    })
  })
})
