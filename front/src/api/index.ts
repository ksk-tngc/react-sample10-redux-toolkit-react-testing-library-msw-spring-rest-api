import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

/**
 * axiosの基本設定
 */
export const appAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
