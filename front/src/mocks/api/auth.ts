import { rest } from 'msw'
import { LoginRequestParam, LoginResponse } from '../../api/authApi'

const API_URL = 'http://localhost:8080/api/v1/auth'

/**
 * モックの実装
 * msw の擬似的な API エンドポイントを定義する
 */
export const auth = [
  // POST /auth
  // ログイン認証
  rest.post<any, any, LoginResponse>(`${API_URL}`, async (req, res, ctx) => {
    // リクエストボディーを取得してみる
    const requestBody: LoginRequestParam = await req.json()

    return res(
      ctx.status(200),
      ctx.json({
        id: 999,
        username: `${requestBody.username} from msw`,
      })
    )
  }),
]
