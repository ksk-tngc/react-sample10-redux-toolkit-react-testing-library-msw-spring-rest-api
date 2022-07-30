import { FC, memo, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import styles from '../../css/TaskList.module.css'
import { getTasksAsync, selectTask } from '../../slice/taskSlice'
import { TaskListItem } from './TaskListItem'

/**
 * タスク一覧
 */
export const TaskList: FC = memo(() => {
  const dispatch = useAppDispatch()
  const { tasks } = useAppSelector(selectTask)

  /**
   * 初回レンダリング時
   * 　・タスクの一覧を取得
   */
  useEffect(() => {
    // MEMO: useEffect の中で非同期関数を実行する場合は
    // 一旦非同期関数を定義してそれを実行する。
    const fetchData = async () => {
      // タスクを全件取得
      await dispatch(getTasksAsync())
    }
    fetchData()
  }, [dispatch])

  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  )
})
