import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loginReducer } from '../features/login/slice/loginSlice'
import { taskReducer } from '../features/task/slice/taskSlice'

/**
 * setup関数を用意してexportする
 * （テストで毎回storeを作成するため）
 */
export const setupStore = () => {
  // Store に Reducer を登録
  // 裏で combineReducers が走り、Reducer を結合してくれる。
  const store = configureStore({
    reducer: {
      login: loginReducer,
      task: taskReducer,
    },
  })
  return store
}

// タスクAppのstore
export const store = setupStore()

// MEMO: Redux Toolkit のテンプレートのまま
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
