import { appAxios } from '.'

const API_ENDPOINT = '/v1/users'

export interface UserApiRequestParam {
  username: string
  password: string
}

export interface UserApiResponse {
  id: number
  username: string
}

/**
 * ユーザーAPIをコールするメソッドを提供するクラス
 */
class UserApi {
  /**
   * ユーザーを全件取得
   */
  async getUsers() {
    const res = await appAxios.get<UserApiResponse[]>(`${API_ENDPOINT}`)
    return res.data
  }

  /**
   * ユーザーを1件取得
   */
  async getUser(id: number) {
    const res = await appAxios.get<UserApiResponse>(`${API_ENDPOINT}/${id}`)
    return res.data
  }

  /**
   * ユーザーを1件登録
   */
  async postUser(param: UserApiRequestParam) {
    const res = await appAxios.post<UserApiResponse>(`${API_ENDPOINT}`, param)
    return res.data
  }

  /**
   * ユーザーを1件更新
   */
  async patchUser(id: number, param: UserApiRequestParam) {
    const res = await appAxios.patch<UserApiResponse>(
      `${API_ENDPOINT}/${id}`,
      param
    )
    return res.data
  }

  /**
   * ユーザーを1件削除
   */
  async deleteUser(id: number) {
    const res = await appAxios.delete(`${API_ENDPOINT}/${id}`)
    return res.data
  }
}

export const userApi = new UserApi()
