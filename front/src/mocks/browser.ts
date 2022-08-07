import { setupWorker } from 'msw'
import { handlers } from './handlers'

// msw のサービスワーカーを作成（ブラウザ 環境用）
export const worker = setupWorker(...handlers)
