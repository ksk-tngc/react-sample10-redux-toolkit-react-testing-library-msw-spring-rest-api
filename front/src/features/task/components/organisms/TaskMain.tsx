import { FC, memo } from 'react'
import { TaskHeader } from '../molecules/TaskHeader'
import { TaskInput } from '../molecules/TaskInput'
import { TaskList } from '../molecules/TaskList'
import styles from './css/TaskMain.module.css'

/**
 * タスクのメイン領域
 */
export const TaskMain: FC = memo(() => {
  return (
    <div className={styles.taskMain} data-testid="task-main">
      <TaskHeader />
      <TaskInput />
      <TaskList />
    </div>
  )
})
