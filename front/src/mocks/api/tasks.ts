import { PathParams, rest } from 'msw'
import { TaskApiRequestParam, TaskApiResponse } from '../../api/taskApi'

const API_URL = 'http://localhost:8080/api/v1/tasks'

/**
 * モックの実装
 * msw の擬似的な API エンドポイントを定義する
 */
export const tasks = [
  /**
   * GET /tasks
   * タスクを全件取得
   */
  rest.get<any, PathParams, TaskApiResponse[]>(
    `${API_URL}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'task 1 from msw',
            createdAt: '2022-08-02T20:00:00',
            updatedAt: '2022-08-02T20:30:00',
          },
          {
            id: 2,
            title: 'task 2 from msw',
            createdAt: '2022-08-02T20:00:00',
            updatedAt: '2022-08-02T20:30:00',
          },
          {
            id: 3,
            title: 'task 3 from msw',
            createdAt: '2022-08-02T20:00:00',
            updatedAt: '2022-08-02T20:30:00',
          },
        ])
      )
    }
  ),
  /**
   * GET /tasks/{id}
   * タスクを1件取得
   */
  rest.get<any, PathParams<'id'>, TaskApiResponse>(
    `${API_URL}/:id`,
    (req, res, ctx) => {
      // パスパラメータ id の値を取得してみる
      const id = Number(req.params.id)

      return res(
        ctx.status(200),
        ctx.json({
          id,
          title: `task ${id} from msw`,
          createdAt: '2022-08-02T20:00:00',
          updatedAt: '2022-08-02T20:30:00',
        })
      )
    }
  ),
  /**
   * POST /tasks
   * タスクを1件登録
   */
  rest.post<any, PathParams, TaskApiResponse>(
    `${API_URL}`,
    async (req, res, ctx) => {
      // リクエストボディーを取得してみる
      const requestBody: TaskApiRequestParam = await req.json()

      return res(
        ctx.status(200),
        ctx.json({
          id: 999,
          title: `${requestBody.title} from msw`,
          createdAt: '2022-08-02T20:00:00',
          updatedAt: '2022-08-02T20:30:00',
        })
      )
    }
  ),
  /**
   * PATCH /tasks/{id}
   * タスクを1件更新
   */
  rest.patch<any, PathParams<'id'>, TaskApiResponse>(
    `${API_URL}/:id`,
    async (req, res, ctx) => {
      // パスパラメータ id の値を取得してみる
      const id = Number(req.params.id)
      // リクエストボディーを取得してみる
      const requestBody: TaskApiRequestParam = await req.json()

      return res(
        ctx.status(200),
        ctx.json({
          id,
          title: `${requestBody.title} from msw`,
          createdAt: '2022-08-02T20:00:00',
          updatedAt: '2022-08-02T20:30:00',
        })
      )
    }
  ),
  /**
   * DELETE /tasks/{id}
   * タスクを1件削除
   */
  rest.delete<any, PathParams<'id'>, {}>(
    `${API_URL}/:id`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({}))
    }
  ),
]
