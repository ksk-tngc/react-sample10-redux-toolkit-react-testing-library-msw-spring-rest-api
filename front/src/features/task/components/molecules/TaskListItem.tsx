import { FC, memo } from 'react'
import { BsTrash } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { TaskApiResponse } from '../../../../api/taskApi'
import { useAppDispatch } from '../../../../app/hooks'
import { deleteTaskAsync, taskSlice } from '../../slice/taskSlice'
import styles from './css/TaskListItem.module.css'

interface Props {
  task: TaskApiResponse
}

/**
 * タスク一覧の各行
 */
export const TaskListItem: FC<Props> = memo((props) => {
  const { task } = props
  const dispatch = useAppDispatch()
  const { setInputTask, setSelectedTask } = taskSlice.actions

  return (
    <li className={styles.taskListItem}>
      {/* タスク名 */}
      <span
        className={styles.taskName}
        onClick={() => {
          dispatch(setSelectedTask(task.id))
          dispatch(setInputTask({ value: '' }))
        }}
        data-testid="task-name"
      >
        {task.title}
      </span>
      <div>
        {/* 編集ボタン */}
        <button
          className={styles.taskIcon}
          onClick={() =>
            dispatch(taskSlice.actions.clickEditBtn({ id: task.id }))
          }
          data-testid="edit-btn"
        >
          <FaEdit />
        </button>
        {/* 削除ボタン */}
        <button
          className={styles.taskIcon}
          onClick={() => dispatch(deleteTaskAsync(task.id))}
          data-testid="del-btn"
        >
          <BsTrash />
        </button>
      </div>
    </li>
  )
})
