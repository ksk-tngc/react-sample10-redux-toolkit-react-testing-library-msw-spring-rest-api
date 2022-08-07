import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { setupStore } from '../../../../../app/store'
import { TaskMain } from '../TaskMain'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskMain />
    </Provider>
  )
}

// 各テストケース実施前にコンポーネントをレンダリングする
beforeEach(async () => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  renderComponent()
  // MEMO: useEffect で API からタスク一覧を取得しているので
  // 取得完了を待機する。
  await screen.findByText(/^task 3 from msw$/)
})

describe('タスクメイン画面', () => {
  describe('タスク一覧の編集ボタンクリック時', () => {
    test('テキストボックスにタスク名がセットされること', async () => {
      await userEvent.click(screen.getAllByTestId('edit-btn')[0])
      expect(screen.getByTestId('task-input')).toHaveValue('task 1 from msw')
    })
    test('ボタンのラベルが変更されること', async () => {
      await userEvent.click(screen.getAllByTestId('edit-btn')[0])
      expect(screen.getByTestId('create-update-btn')).toHaveTextContent(
        /^Update$/
      )
    })
  })

  describe('タスク一覧の削除ボタンクリック時', () => {
    test('一覧から該当タスクが削除されること', async () => {
      await userEvent.click(screen.getAllByTestId('del-btn')[0])
      expect(screen.queryByText(/^task 1 from msw$/)).not.toBeInTheDocument()
    })
    test('テキストボックスの値が空白となっていること', async () => {
      await userEvent.click(screen.getAllByTestId('del-btn')[0])
      expect(screen.getByTestId('task-input')).toHaveValue('')
    })
    test('ボタンのラベルが「Create」になっていること', async () => {
      await userEvent.click(screen.getAllByTestId('del-btn')[0])
      expect(screen.getByTestId('create-update-btn')).toHaveTextContent(
        /^Create/
      )
    })
    test('ボタンが非活性となっていること', async () => {
      await userEvent.click(screen.getAllByTestId('del-btn')[0])
      expect(screen.getByTestId('create-update-btn')).toBeDisabled()
    })
  })
})
