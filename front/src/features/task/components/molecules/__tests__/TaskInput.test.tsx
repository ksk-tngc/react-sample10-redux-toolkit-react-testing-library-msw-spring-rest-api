import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { setupStore } from '../../../../../app/store'
import { TaskInput } from '../TaskInput'

const renderComponent = () => {
  // テスト用の store を作成
  const store = setupStore()
  // コンポーネントをレンダリング
  return render(
    <Provider store={store}>
      <TaskInput />
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
      expect(screen.getByTestId('task-input')).toBeInTheDocument()
      expect(screen.getByTestId('create-update-btn')).toBeInTheDocument()
    })

    test('ラベル・プレースホルダーの文言が正しいこと', async () => {
      expect(screen.getByTestId('task-input')).toHaveAttribute(
        'placeholder',
        'Please input task'
      )
      expect(screen.getByTestId('create-update-btn')).toHaveTextContent(
        /^Create$/
      )
    })
  })
})
