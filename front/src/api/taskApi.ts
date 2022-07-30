import { appAxios } from '.'

const API_ENDPOINT = '/v1/tasks'

export interface TaskApiRequestParam {
  title: string
}

export interface TaskApiResponse {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

/**
 * TaskApiResponseの日付項目をISO8601からLocaleStringに変換する
 *
 * @param res 変換対象のTaskApiResponseオブジェクト
 * @returns 日付項目をISO8601からLocaleStringに変換したTaskApiResponseオブジェクト
 */
const convertDates = (res: TaskApiResponse): TaskApiResponse => ({
  id: res.id,
  title: res.title,
  createdAt: new Date(res.createdAt).toLocaleString(),
  updatedAt: new Date(res.updatedAt).toLocaleString(),
})

/**
 * タスクAPIをコールするメソッドを提供するクラス
 */
class TaskApi {
  /**
   * タスクを全件取得
   */
  async getTasks() {
    const res = await appAxios.get<TaskApiResponse[]>(`${API_ENDPOINT}`)
    const data = res.data.map((data) => convertDates(data))
    return data
  }

  /**
   * タスクを1件取得
   */
  async getTask(id: number) {
    const res = await appAxios.get<TaskApiResponse>(`${API_ENDPOINT}/${id}`)
    const data = convertDates(res.data)
    return data
  }

  /**
   * タスクを1件登録
   */
  async postTask(param: TaskApiRequestParam) {
    const res = await appAxios.post<TaskApiResponse>(`${API_ENDPOINT}`, param)
    const data = convertDates(res.data)
    return data
  }

  /**
   * タスクを1件更新
   */
  async patchTask(id: number, param: TaskApiRequestParam) {
    const res = await appAxios.patch<TaskApiResponse>(
      `${API_ENDPOINT}/${id}`,
      param
    )
    const data = convertDates(res.data)
    return data
  }

  /**
   * タスクを1件削除
   */
  async deleteTask(id: number) {
    await appAxios.delete(`${API_ENDPOINT}/${id}`)
  }
}

export const taskApi = new TaskApi()
