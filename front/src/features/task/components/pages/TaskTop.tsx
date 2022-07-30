import { FC, memo } from 'react'
import styles from '../../css/TaskTop.module.css'
import { TaskDetail } from '../organisms/TaskDetail'
import { TaskMain } from '../organisms/TaskMain'

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
