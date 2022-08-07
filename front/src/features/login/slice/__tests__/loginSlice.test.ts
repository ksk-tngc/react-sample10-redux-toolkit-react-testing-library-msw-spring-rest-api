import { Action, PayloadAction } from '@reduxjs/toolkit'
import { LoginResponse } from '../../../../api/authApi'
import {
  LOCAL_STORAGE_KEYS,
  loginAsync,
  loginSlice,
  LoginState,
} from '../loginSlice'

/**
 * MEMO: Redux Toolkit の reducer のテスト
 *  - state と action を reducer に渡し、正しく state が遷移しているか確認する。
 */
describe('reducerのテスト', () => {
  // const initialState: LoginState = {
  //   inputValue: {
  //     username: '',
  //     password: '',
  //   },
  //   isLoginView: true,
  //   principalUser: {
  //     id: 0,
  //     username: '',
  //   },
  // }
  // MEMO: slice から必要なものを取り出す
  const reducer = loginSlice.reducer
  const initialState = loginSlice.getInitialState()
  const { editUserName, editPassword, toggleMode } = loginSlice.actions

  describe('[action]: editUserName', () => {
    test('state.username が payload の値で更新されること', async () => {
      const currentState: LoginState = { ...initialState }
      const payload = 'USERNAME'
      const newState = reducer(currentState, editUserName({ value: payload }))
      expect(newState.inputValue.username).toEqual(payload)
    })
  })

  describe('[action]: editPassword', () => {
    test('state.password が payload の値で更新されること', async () => {
      const currentState: LoginState = { ...initialState }
      const payload = 'PASS'
      const newState = reducer(currentState, editPassword({ value: payload }))
      expect(newState.inputValue.password).toEqual(payload)
    })
  })

  describe('[action]: toggleMode', () => {
    test('state.isLoginView の true/false が反転すること', async () => {
      let currentState: LoginState = { ...initialState, isLoginView: true }
      let newState = reducer(currentState, toggleMode())
      expect(newState.isLoginView).toEqual(!currentState.isLoginView)

      currentState = { ...initialState, isLoginView: false }
      newState = reducer(currentState, toggleMode())
      expect(newState.isLoginView).toEqual(!currentState.isLoginView)
    })
  })
})

/**
 * MEMO: Redux Toolkit の extraReducers のテスト
 *  - state と action を reducer に渡し、正しく state が遷移しているか確認する。
 *  - action.type は AsyncThunk.fulfilled.type 等を使用する。
 */
describe('extraReducersのテスト', () => {
  // MEMO: slice から必要なものを取り出す
  const reducer = loginSlice.reducer
  const initialState = loginSlice.getInitialState()

  describe('[action]: loginAsync.fulfilled', () => {
    test('localStorage に ログインユーザーIDが保存されていること、state.principalUser にユーザー情報が保存されていること', async () => {
      const currentState: LoginState = { ...initialState }
      const action: PayloadAction<LoginResponse> = {
        type: loginAsync.fulfilled.type, // MEMO: action.type の指定方法
        payload: {
          id: 999,
          username: 'USERNAME',
        },
      }
      const newState = reducer(currentState, action)
      expect(localStorage.getItem(LOCAL_STORAGE_KEYS.LOGIN_USER_ID)).toEqual(
        action.payload.id.toString()
      )
      expect(newState.principalUser.id).toEqual(action.payload.id)
      expect(newState.principalUser.username).toEqual(action.payload.username)
    })
  })

  describe('[action]: loginAsync.rejected', () => {
    test('state.principalUser が初期 state となっていること', async () => {
      const currentState: LoginState = {
        ...initialState,
        principalUser: { id: 999, username: 'LOGIN_FAIL_USERNAME' },
      }
      const action: Action = {
        type: loginAsync.rejected.type,
      }
      const newState = reducer(currentState, action)
      expect(newState.principalUser.id).toEqual(initialState.principalUser.id)
      expect(newState.principalUser.username).toEqual(
        initialState.principalUser.username
      )
    })
  })
})
