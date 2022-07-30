import { FC, memo } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import styles from '../../css/TaskDetail.module.css'
import { selectTask } from '../../slice/taskSlice'

/**
 * タスクの詳細領域
 */
export const TaskDetail: FC = memo(() => {
  const { selectedTask } = useAppSelector(selectTask)

  return (
    <div className={styles.taskDetail}>
      {selectedTask && (
        <>
          {/* タスク名 */}
          <h2 className={styles.title}>{selectedTask.title}</h2>
          <dl className={styles.detailList}>
            {/* 作成日時 */}
            <dt className={styles.detailListTerm}>Created at</dt>
            <dd className={styles.detailListDetail}>
              {selectedTask.createdAt}
            </dd>
            {/* 更新日時 */}
            <dt className={styles.detailListTerm}>Updated at</dt>
            <dd className={styles.detailListDetail}>
              {selectedTask.updatedAt}
            </dd>
          </dl>
        </>
      )}
    </div>
  )
})
