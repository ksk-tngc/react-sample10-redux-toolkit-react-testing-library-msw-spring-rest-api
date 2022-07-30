import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  createTaskAsync,
  getTasksAsync,
  patchTaskAsync,
  selectTask,
} from '../features/task/slice/taskSlice'

/**
 * タスク関連のカスタムフック
 */
export const useTask = () => {
  const { inputTask, editingTask, mode } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()

  /**
   * タスクの登録/更新処理 (登録/更新ボタンのハンドラ)
   * 　・CREATEモードならタスクを1件登録
   * 　・UPDATEモードならタスクを1件更新
   */
  const createOrUpdateTaskAsync = useCallback(async () => {
    mode === 'CREATE'
      ? // タスク1件登録
        await dispatch(createTaskAsync({ title: inputTask }))
      : editingTask &&
        (async () => {
          // MEMO: アロー関数の即時関数で三項演算子でも複数行の処理が可能
          // タスク1件更新
          await dispatch(
            patchTaskAsync({
              id: editingTask.id,
              param: { title: inputTask },
            })
          )
          // タスク一覧を取り直す
          await dispatch(getTasksAsync())
        })()
  }, [dispatch, editingTask, inputTask, mode])

  return { createOrUpdateTaskAsync }
}
