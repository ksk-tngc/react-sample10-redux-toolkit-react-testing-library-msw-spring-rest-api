import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// msw のモックサーバーを作成（Node.js 環境用）
export const server = setupServer(...handlers)
