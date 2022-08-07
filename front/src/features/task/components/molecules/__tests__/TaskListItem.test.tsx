import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { TaskApiResponse } from '../../../../../api/taskApi'
import { setupStore } from '../../../../../app/store'
import { TaskListItem } from '../TaskListItem'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // テスト用のタスク
  const task: TaskApiResponse = {
    id: 1,
    title: 'test task',
    createdAt: '2022-08-02T20:00:00',
    updatedAt: '2022-08-02T20:30:00',
  }
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskListItem task={task} />
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
      expect(screen.getByTestId('task-name')).toBeInTheDocument()
      expect(screen.getByTestId('edit-btn')).toBeInTheDocument()
      expect(screen.getByTestId('del-btn')).toBeInTheDocument()
    })

    test('初期値が正しいこと', async () => {
      expect(screen.getByTestId('task-name')).toHaveTextContent(/^test task$/)
    })
  })

  describe('編集ボタン', () => {
    // NOTE: `TaskMain.test.tsx` で確認
  })

  describe('削除ボタン', () => {
    // NOTE: `TaskMain.test.tsx` で確認
  })
})
