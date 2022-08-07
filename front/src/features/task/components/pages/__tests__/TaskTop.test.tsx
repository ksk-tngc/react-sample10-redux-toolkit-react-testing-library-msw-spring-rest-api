/* eslint-disable testing-library/prefer-screen-queries */
import {
  getAllByTestId,
  getByTestId,
  render,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { setupStore } from '../../../../../app/store'
import { TaskTop } from '../TaskTop'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskTop />
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

describe('タスクページ', () => {
  describe('タスク一覧のタスククリック時', () => {
    test('タスク詳細にタスクの情報が表示されること', async () => {
      const main = screen.getByTestId('task-main')
      const taskName = getAllByTestId(main, 'task-name')[0]
      await userEvent.click(taskName)

      const detail = screen.getByTestId('task-detail-main')
      expect(getByTestId(detail, 'task-name')).toHaveTextContent(
        /^task 1 from msw$/
      )
      // MEMO: Jestが取得する日付の書式と実際にレンダリングされている日付の書式が異なるため
      // Dateオブジェクトに変換して比較する。
      expect(
        new Date(getByTestId(detail, 'task-created-at').innerHTML)
      ).toEqual(new Date('2022/8/2 20:00:00'))
      expect(
        new Date(getByTestId(detail, 'task-updated-at').innerHTML)
      ).toEqual(new Date('2022/8/2 20:30:00'))
    })
  })
})
