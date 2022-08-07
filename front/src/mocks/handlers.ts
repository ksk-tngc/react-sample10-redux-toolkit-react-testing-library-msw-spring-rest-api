import { auth } from './api/auth'
import { tasks } from './api/tasks'
import { users } from './api/users'

// リクエストハンドラー
// msw の擬似的な API エンドポイント（モックの実装）をまとめる
export const handlers = [...auth, ...users, ...tasks]
