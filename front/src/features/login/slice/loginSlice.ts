import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi, LoginRequestParam } from '../../../api/authApi'
import { userApi, UserApiRequestParam } from '../../../api/userApi'
import { RootState } from '../../../app/store'

/////////////////////////////////////// const ///////////////////////////////////////

export const LOCAL_STORAGE_KEYS = {
  LOGIN_USER_ID: 'LOGIN_USER_ID',
} as const

/////////////////////////////////////// interface ///////////////////////////////////////

/**
 * loginSlice の state の型
 */
export interface LoginState {
  // ログイン/サインアップ画面の入力値を保持
  inputValue: {
    username: string
    password: string
  }
  // ログイン画面/サインアップ画面切り替え用
  isLoginView: boolean
  // ログインユーザーに関する情報
  principalUser: {
    id: number
    username: string
  }
}

/////////////////////////////////////// variable ///////////////////////////////////////

/**
 * loginSlice の state の初期値
 */
const initialState: LoginState = {
  inputValue: {
    username: '',
    password: '',
  },
  isLoginView: true,
  principalUser: {
    id: 0,
    username: '',
  },
}

/////////////////////////////////////// AsyncThunk ///////////////////////////////////////

/**
 * ログイン認証を行う非同期処理（AsyncThunk）
 * 　・AsyncThunk は action creator なのでコンポーネントから dispatch 経由で実行可能。
 */
export const loginAsync = createAsyncThunk(
  // 第1引数：action.type
  'login/post/auth',
  // 第2引数：非同期処理。戻り値は AsyncThunk.fulfilled や .rejected (=action creator) の action.payload に渡される。
  async (param: LoginRequestParam) => {
    // await は Promise の結果（resolve() or reject() の値）を返す。
    return await authApi.login(param)
  }
)

/**
 * ユーザーを登録する非同期処理（AsyncThunk）
 */
export const registerUserAsync = createAsyncThunk(
  'login/post/users',
  async (param: UserApiRequestParam) => {
    return await userApi.postUser(param)
  }
)

/////////////////////////////////////// slice ///////////////////////////////////////

/**
 * slice の定義
 */
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  /**
   * MEMO:
   * reducers フィールドでは、reducer 関数を定義し、関連する action (action creator) を生成することができる。
   * slice.actions で、各 action creator を取得できる。
   */
  reducers: {
    /**
     * ログイン/サインアップ画面の [ユーザー名] フィールドの値変更時
     */
    editUserName: (
      state,
      action: PayloadAction<{ value: LoginState['inputValue']['username'] }>
    ) => {
      state.inputValue.username = action.payload.value
    },
    /**
     * ログイン/サインアップ画面の [パスワード] フィールドの値変更時
     */
    editPassword: (
      state,
      action: PayloadAction<{ value: LoginState['inputValue']['password'] }>
    ) => {
      state.inputValue.password = action.payload.value
    },
    /**
     * ログイン/サインアップ画面の切り替え時
     */
    toggleMode: (state) => {
      state.isLoginView = !state.isLoginView
    },
  },
  /**
   * MEMO:
   * extraReducers フィールドにより、slice は他の場所で定義されたアクションを処理できる。
   * createAsyncThunk または他の slice によって生成されたアクションを含む。
   * builder.addCase() で、extraReducers が処理する action と reducer を slice に登録する。
   * builder.addCase()：
   * 　・第1引数：action creator を指定する。
   * 　　AsyncThunk の非同期処理の状態（fulfilled や pending、rejected）も action creator なので第1引数に指定できる。
   * 　・第2引数：reducer 関数。第1引数に AsyncThunk（の.fulfilled など）を指定した場合、
   * 　　action.payload には AsyncThunk 内の非同期関数の戻り値が渡されるので、reducer 内で非同期関数の結果を使用する事ができる。
   */
  extraReducers: (builder) => {
    builder
      /**
       * ログイン処理成功時
       * 　・第1引数：action creator。AsyncThunk の場合、非同期処理の状態（fulfilled など）を表す action creator が使用できる。
       * 　・第2引数：reducer 関数。現在の state と action を受け取り、state を遷移させる。
       * 　　AsyncThunk の場合、action.payload は AsyncThunk 内の非同期処理の戻り値が payload として渡ってくる。
       */
      .addCase(loginAsync.fulfilled, (state, action) => {
        // ログインユーザIDを LocalStorage に格納
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.LOGIN_USER_ID,
          action.payload.id.toString()
        )
        // ログインユーザの情報を State に格納
        state.principalUser.id = action.payload.id
        state.principalUser.username = action.payload.username
      })
      /**
       * ログイン失敗時
       */
      .addCase(loginAsync.rejected, (state, action) => {
        state.principalUser = initialState.principalUser
      })
  },
})

// action creator を export (dispatch で使用する)
export const { editUserName, editPassword, toggleMode } = loginSlice.actions

// state を取り出す selector 関数を export (useSelector で使用する)
export const selectLogin = (state: RootState) => state.login

// reducer を export (store に登録する)
export const loginReducer = loginSlice.reducer
