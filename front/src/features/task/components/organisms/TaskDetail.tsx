import { FC, memo } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import { selectTask } from '../../slice/taskSlice'
import styles from './css/TaskDetail.module.css'

/**
 * タスクの詳細領域
 */
export const TaskDetail: FC = memo(() => {
  const { selectedTask } = useAppSelector(selectTask)

  return (
    <div className={styles.taskDetail} data-testid="task-detail-main">
      {selectedTask && (
        <>
          {/* タスク名 */}
          <h2 className={styles.title} data-testid="task-name">
            {selectedTask.title}
          </h2>
          <dl className={styles.detailList}>
            {/* 作成日時 */}
            <dt
              className={styles.detailListTerm}
              data-testid="task-created-at-label"
            >
              Created at
            </dt>
            <dd
              className={styles.detailListDetail}
              data-testid="task-created-at"
            >
              {selectedTask.createdAt}
            </dd>
            {/* 更新日時 */}
            <dt
              className={styles.detailListTerm}
              data-testid="task-updated-at-label"
            >
              Updated at
            </dt>
            <dd
              className={styles.detailListDetail}
              data-testid="task-updated-at"
            >
              {selectedTask.updatedAt}
            </dd>
          </dl>
        </>
      )}
    </div>
  )
})
