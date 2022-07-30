import { FC, memo } from 'react'
import styles from '../../css/TaskMain.module.css'
import { TaskHeader } from '../molecules/TaskHeader'
import { TaskInput } from '../molecules/TaskInput'
import { TaskList } from '../molecules/TaskList'

/**
 * タスクのメイン領域
 */
export const TaskMain: FC = memo(() => {
  return (
    <div className={styles.taskMain}>
      <TaskHeader />
      <TaskInput />
      <TaskList />
    </div>
  )
})
