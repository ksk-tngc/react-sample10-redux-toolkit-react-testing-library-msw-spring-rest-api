import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../../../../app/store'
import { TaskDetail } from '../TaskDetail'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskDetail />
    </Provider>
  )
}

// 各テストケース実施前にコンポーネントをレンダリングする
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderComponent()
})

describe('タスク詳細画面', () => {
  describe('初期表示の確認', () => {
    test('何も表示されていないこと', async () => {
      const main = screen.getByTestId('task-detail-main')
      expect(main.innerHTML).toBe('')
      expect(main.childElementCount).toBe(0)
    })
  })
})
