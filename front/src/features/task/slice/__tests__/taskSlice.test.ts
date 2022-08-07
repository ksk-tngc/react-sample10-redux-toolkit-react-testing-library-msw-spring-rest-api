import { PayloadAction } from '@reduxjs/toolkit'
import { TaskApiResponse } from '../../../../api/taskApi'
import {
  createTaskAsync,
  deleteTaskAsync,
  getTasksAsync,
  patchTaskAsync,
  taskSlice,
  TaskState,
} from '../taskSlice'

/**
 * MEMO: Redux Toolkit の reducer のテスト
 *  - state と action を reducer に渡し、正しく state が遷移しているか確認する。
 */
describe('reducerのテスト', () => {
  // MEMO: slice から必要なものを取り出す
  const reducer = taskSlice.reducer
  const initialState: TaskState = taskSlice.getInitialState()
  const { clickEditBtn, setInputTask, setSelectedTask } = taskSlice.actions

  const testState: TaskState = {
    ...initialState,
    tasks: [
      {
        id: 1,
        title: 'test task 1',
        createdAt: '2022-08-02T20:00:00',
        updatedAt: '2022-08-02T20:30:00',
      },
      {
        id: 2,
        title: 'test task 2',
        createdAt: '2022-08-02T21:00:00',
        updatedAt: '2022-08-02T21:30:00',
      },
    ],
  }

  describe('[action]: clickEditBtn', () => {
    test('state.editingTask, state.selectedTask に payload.id のタスクがセットされること', async () => {
      const currentState: TaskState = { ...testState }
      const taskId = 2
      const newState = reducer(currentState, clickEditBtn({ id: taskId }))
      expect(newState.editingTask).toEqual(currentState.tasks[1])
      expect(newState.selectedTask).toEqual(currentState.tasks[1])
    })

    test('state.inputTask に payload.id のタスク名がセットされること', async () => {
      const currentState: TaskState = { ...testState }
      const taskId = 1
      const newState = reducer(currentState, clickEditBtn({ id: taskId }))
      expect(newState.inputTask).toEqual(currentState.tasks[0].title)
    })

    test('state.mode が "UPDATE" に変更されていること', async () => {
      const currentState: TaskState = { ...testState }
      const taskId = 2
      const newState = reducer(currentState, clickEditBtn({ id: taskId }))
      expect(newState.mode).toEqual('UPDATE')
    })
  })

  describe('[action]: setInputTask', () => {
    test('state.inputTask に payload の値がセットされること', async () => {
      const currentState: TaskState = { ...testState }
      const value = 'input task name'
      const newState = reducer(currentState, setInputTask({ value }))
      expect(newState.inputTask).toEqual(value)
    })

    test('payload が空文字の場合、state.inputTask も空になり、state.mode が "CREATE" に変更されること', async () => {
      const currentState: TaskState = { ...testState }
      const value = ''
      const newState = reducer(currentState, setInputTask({ value }))
      expect(newState.inputTask).toEqual('')
      expect(newState.mode).toEqual('CREATE')
    })
  })

  describe('[action]: setSelectedTask', () => {
    test('state.selectedTask に payload.id のタスクがセットされること', async () => {
      const currentState: TaskState = { ...testState }
      const taskId = 2
      const newState = reducer(currentState, setSelectedTask(taskId))
      expect(newState.selectedTask).toEqual(currentState.tasks[1])
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
  const reducer = taskSlice.reducer
  const initialState = taskSlice.getInitialState()

  const testState: TaskState = {
    ...initialState,
    tasks: [
      {
        id: 1,
        title: 'test task 1',
        createdAt: '2022-08-02T20:00:00',
        updatedAt: '2022-08-02T20:30:00',
      },
      {
        id: 2,
        title: 'test task 2',
        createdAt: '2022-08-02T21:00:00',
        updatedAt: '2022-08-02T21:30:00',
      },
    ],
  }

  describe('[action]: getTasksAsync.fulfilled', () => {
    test('タスク取得成功時、state.tasks に payload の値がセットされること', async () => {
      const currentState: TaskState = { ...initialState }
      const action: PayloadAction<TaskApiResponse[]> = {
        type: getTasksAsync.fulfilled.type, // MEMO: action.type の指定方法
        payload: testState.tasks,
      }
      const newState = reducer(currentState, action)
      expect(newState.tasks).toEqual(action.payload)
    })
  })

  describe('[action]: createTaskAsync.fulfilled', () => {
    /**
     * 対象の action で reducer を実行する処理をまとめる
     */
    const execReducer = () => {
      const currentState: TaskState = { ...testState }
      const payload: TaskApiResponse = {
        id: 99,
        title: 'task id 99 has been created',
        createdAt: '2022-08-02T21:00:00',
        updatedAt: '2022-08-02T21:30:00',
      }
      const action: PayloadAction<TaskApiResponse> = {
        type: createTaskAsync.fulfilled.type,
        payload,
      }
      const newState = reducer(currentState, action)
      return { payload, newState }
    }

    test('タスク登録成功時、state.tasks の先頭に payload の値が追加されること', async () => {
      const { payload, newState } = execReducer()
      expect(newState.tasks).toHaveLength(3) // タスクの件数が1件増えていること
      expect(newState.tasks[0]).toEqual(payload) // タスクの先頭に追加されていること
    })

    test('タスク登録成功時、state.selectedTask に payload の値がセットされること', async () => {
      const { payload, newState } = execReducer()
      expect(newState.selectedTask).toEqual(payload)
    })

    test('タスク登録成功時、state.inputTask が空になっていること', async () => {
      const { newState } = execReducer()
      expect(newState.inputTask).toEqual('')
    })
  })

  describe('[action]: patchTaskAsync.fulfilled', () => {
    /**
     * 対象の action で reducer を実行する処理をまとめる
     */
    const execReducer = () => {
      const currentState: TaskState = { ...testState }
      const payload: TaskApiResponse = {
        id: 1,
        title: 'task id 1 has been updated ',
        createdAt: '2022-08-02T21:00:00',
        updatedAt: '2022-08-02T21:59:59',
      }
      const action: PayloadAction<TaskApiResponse> = {
        type: patchTaskAsync.fulfilled.type,
        payload,
      }
      const newState = reducer(currentState, action)
      return { payload, newState }
    }

    test('タスク更新成功時、state.tasks の対象 id の task が payload の値に置き換わること', async () => {
      const { payload, newState } = execReducer()
      expect(newState.tasks[0]).toEqual(payload)
    })

    test('タスク更新成功時、state.selectedTask に payload の値がセットされること', async () => {
      const { payload, newState } = execReducer()
      expect(newState.selectedTask).toEqual(payload)
    })

    test('タスク更新成功時、state.inputTask が空になっていること', async () => {
      const { newState } = execReducer()
      expect(newState.inputTask).toEqual('')
    })
  })

  describe('[action]: deleteTaskAsync.fulfilled', () => {
    /**
     * 対象の action で reducer を実行する処理をまとめる
     */
    const execReducer = () => {
      const currentState: TaskState = { ...testState }
      const payload = 1 // 削除したタスクのID
      const action: PayloadAction<number> = {
        type: deleteTaskAsync.fulfilled.type,
        payload,
      }
      const newState = reducer(currentState, action)
      return { payload, newState }
    }

    test('タスク削除成功時、state.tasks の対象 id の task が削除されること', async () => {
      const { payload, newState } = execReducer()
      expect(newState.tasks).toHaveLength(1) // 削除されていタスクが1件になっていること
      expect(newState.tasks.find((task) => task.id === payload)).toBeUndefined() // ID 1 のタスクが削除されていること
    })

    test('タスク削除成功時、state.selectedTask が null となっていること', async () => {
      const { newState } = execReducer()
      expect(newState.selectedTask).toBeNull()
    })

    test('タスク削除成功時、state.inputTask が空になっていること', async () => {
      const { newState } = execReducer()
      expect(newState.inputTask).toEqual('')
    })
  })
})
