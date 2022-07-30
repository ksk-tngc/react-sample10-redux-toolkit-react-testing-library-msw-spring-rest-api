import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { loginReducer } from '../features/login/slice/loginSlice'
import { taskReducer } from '../features/task/slice/taskSlice'

/**
 * Store に Reducer を登録
 * 　・裏で combineReducers が走り、Reducer を結合してくれる。
 */
export const store = configureStore({
  reducer: {
    login: loginReducer,
    task: taskReducer,
  },
})

// MEMO: Redux Toolkit のテンプレートのまま
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
