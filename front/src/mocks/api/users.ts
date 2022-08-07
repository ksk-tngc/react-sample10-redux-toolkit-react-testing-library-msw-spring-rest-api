import { PathParams, rest } from 'msw'
import { UserApiRequestParam, UserApiResponse } from '../../api/userApi'

const API_URL = 'http://localhost:8080/api/v1/users'

/**
 * モックの実装
 * msw の擬似的な API エンドポイントを定義する
 */
export const users = [
  // GET /users
  // ユーザーを全件取得
  rest.get<any, any, UserApiResponse[]>(`${API_URL}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          username: 'Tom from msw',
        },
        {
          id: 2,
          username: 'Bob from msw',
        },
        {
          id: 3,
          username: 'Jack from msw',
        },
      ])
    )
  }),
  /**
   * GET /users/{id}
   * ユーザーを1件取得
   */
  rest.get<any, PathParams<'id'>, UserApiResponse>(
    `${API_URL}/:id`,
    (req, res, ctx) => {
      // パスパラメータ id の値を取得してみる
      const id = Number(req.params.id)

      return res(
        ctx.status(200),
        ctx.json({
          id,
          username: 'Tom from msw',
        })
      )
    }
  ),
  /**
   * POST /users
   * ユーザーを1件登録
   */
  rest.post<any, PathParams, UserApiResponse>(
    `${API_URL}`,
    async (req, res, ctx) => {
      // リクエストボディーを取得してみる
      const requestBody: UserApiRequestParam = await req.json()

      return res(
        ctx.status(200),
        ctx.json({
          id: 999,
          username: `${requestBody.username} from msw`,
        })
      )
    }
  ),
  /**
   * PATCH /users/{id}
   * ユーザーを1件更新
   */
  rest.patch<any, PathParams<'id'>, UserApiResponse>(
    `${API_URL}/:id`,
    async (req, res, ctx) => {
      // パスパラメータ id の値を取得してみる
      const id = Number(req.params.id)
      // リクエストボディーを取得してみる
      const requestBody: UserApiRequestParam = await req.json()

      return res(
        ctx.status(200),
        ctx.json({
          id,
          username: `${requestBody.username} from msw`,
        })
      )
    }
  ),
  /**
   * DELETE /users/{id}
   * ユーザーを1件削除
   */
  rest.delete<any, PathParams<'id'>, {}>(
    `${API_URL}/:id`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  ),
]
