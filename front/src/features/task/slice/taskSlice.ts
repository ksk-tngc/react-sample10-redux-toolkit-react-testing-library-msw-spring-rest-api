import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  taskApi,
  TaskApiRequestParam,
  TaskApiResponse,
} from '../../../api/taskApi'
import { RootState } from '../../../app/store'

/////////////////////////////////////// interface ///////////////////////////////////////

type Task = TaskApiResponse

/**
 * taskSlice の state の型
 */
export interface TaskState {
  // タスクの一覧
  tasks: Task[]
  // タスク入力テキストボックス
  inputTask: string
  // 現在のモード
  mode: 'CREATE' | 'UPDATE'
  // 編集中のタスク
  editingTask: Task | null
  // 選択したタスク
  selectedTask: Task | null
}

/////////////////////////////////////// variable ///////////////////////////////////////

/**
 * taskSlice の state の初期値
 */
const initialState: TaskState = {
  tasks: [],
  inputTask: '',
  mode: 'CREATE',
  editingTask: null,
  selectedTask: null,
}

/////////////////////////////////////// AsyncThunk ///////////////////////////////////////

/**
 * タスクを全件取得する非同期処理（AsyncThunk）
 * 　・AsyncThunk は action creator なのでコンポーネントから dispatch 経由で実行可能。
 */
export const getTasksAsync = createAsyncThunk(
  // 第1引数：action.type
  'task/get',
  // 第2引数：非同期処理。戻り値は AsyncThunk.fulfilled や .rejected (=action creator) の action.payload に渡される。
  async () => {
    // await は Promise の結果（resolve() or reject() の値）を返す。
    return await taskApi.getTasks()
  }
)

/**
 * タスクを1件登録する非同期処理（AsyncThunk）
 */
export const createTaskAsync = createAsyncThunk(
  'task/post',
  async (payload: TaskApiRequestParam) => {
    return await taskApi.postTask(payload)
  }
)

/**
 * タスクを1件更新する非同期処理（AsyncThunk）
 */
export const patchTaskAsync = createAsyncThunk(
  'task/patch',
  async (payload: { id: number } & { param: TaskApiRequestParam }) => {
    return await taskApi.patchTask(payload.id, payload.param)
  }
)

/**
 * タスクを1件削除する非同期処理（AsyncThunk）
 */
export const deleteTaskAsync = createAsyncThunk(
  'task/delete',
  async (id: number) => {
    // delete はレスポンスなし
    await taskApi.deleteTask(id)
    // 削除したタスクのIDを extraReducers の reducer の payload に渡す
    return id
  }
)

/////////////////////////////////////// slice ///////////////////////////////////////

/**
 * slice の定義
 */
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  /**
   * MEMO:
   * reducers フィールドでは、reducer 関数を定義し、関連する action (action creator) を生成することができる。
   * slice.actions で、各 action creator を取得できる。
   */
  reducers: {
    /**
     * 編集ボタンクリック
     * 　・編集中のタスクをセット
     * 　・編集対象のタスクを選択
     * 　・タスク入力テキストボックスに編集対象のタスク名をセット
     * 　・モードを `UPDATE` にする
     */
    clickEditBtn: (state, action: PayloadAction<{ id: number }>) => {
      state.editingTask =
        state.tasks.find((task) => task.id === action.payload.id) || null

      if (state.editingTask) {
        state.selectedTask = state.editingTask
        state.inputTask = state.editingTask.title
        state.mode = 'UPDATE'
      }
    },
    /**
     * タスク入力テキストボックスの値変更時
     * 　・空になったらモードを `CREATE` に戻す
     */
    setInputTask: (state, action: PayloadAction<{ value: string }>) => {
      state.inputTask = action.payload.value
      state.inputTask === '' && (state.mode = 'CREATE')
    },
    /**
     * タスクを選択する
     */
    setSelectedTask: (state, action: PayloadAction<number>) => {
      state.selectedTask =
        state.tasks.find((task) => task.id === action.payload) || null
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
       * タスク全件取得成功時
       * 　・AsyncThunk の非同期処理の結果 (=タスク一覧) が fulfilled の
       * 　　action.payload に入ってくるので、state に格納
       */
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      /**
       * タスク1件登録成功時
       * 　・タスク一覧を保持する state に、登録したタスクを追加
       * 　・登録したタスクを選択
       * 　・タスク入力テキストボックスをクリア
       */
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload)
        state.selectedTask = action.payload
        state.inputTask = ''
      })
      /**
       * タスク1件更新成功時
       * 　・タスク一覧を保持する state を更新
       * 　・更新したタスクを選択
       * 　・タスク入力テキストボックスをクリア
       */
      .addCase(patchTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        )
        state.selectedTask = action.payload
        state.inputTask = ''
      })
      /**
       * タスク1件削除成功時
       * 　・タスク一覧を保持する state からも削除
       * 　・タスク入力テキストボックスをクリア
       * 　・選択中のタスクをクリア
       */
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        state.inputTask = ''
        state.selectedTask = null
      })
  },
})

// action creator を export (dispatch で使用する)
// MEMO: コンポーネントからは slice.actions.actionName で取得して使用するため
// 今回は export しない。
// export const { } = taskSlice.actions

// state を取り出す selector 関数を export (useSelector で使用する)
export const selectTask = (state: RootState) => state.task

// reducer を export (store に登録する)
export const taskReducer = taskSlice.reducer
