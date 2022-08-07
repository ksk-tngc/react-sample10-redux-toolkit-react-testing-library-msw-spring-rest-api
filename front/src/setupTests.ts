// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { server } from './mocks/server'

// 全てのテストの開始前
beforeAll(() => {
  // モックサーバー(msw)を起動
  // Jest の API コールは msw でモックする
  server.listen()
})

// 各テストの終了時
afterEach(() => {
  // 個々のテストが干渉し合わないようにモックサーバー(msw)の状態をリセットする
  server.resetHandlers()
})

// 全てのテストの終了時
afterAll(() => {
  // モックサーバー(msw)をクローズする
  server.close()
})
