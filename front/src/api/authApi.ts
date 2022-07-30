import { appAxios } from '.'

const API_ENDPOINT = '/v1/auth'

export interface LoginRequestParam {
  username: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
}

/**
 * 認証周りのAPIをコールするメソッドを提供するクラス
 */
class AuthApi {
  /**
   * ログイン認証（簡易版）
   */
  async login(param: LoginRequestParam) {
    const res = await appAxios.post<LoginResponse>(`${API_ENDPOINT}`, param)
    return res.data
  }
}

export const authApi = new AuthApi()
