import { FC, memo } from 'react'
import { TaskDetail } from '../organisms/TaskDetail'
import { TaskMain } from '../organisms/TaskMain'
import styles from './css/TaskTop.module.css'

/**
 * タスク画面トップページ
 */
export const TaskTop: FC = memo(() => {
  return (
    <div className={styles.container}>
      <TaskMain />
      <TaskDetail />
    </div>
  )
})
