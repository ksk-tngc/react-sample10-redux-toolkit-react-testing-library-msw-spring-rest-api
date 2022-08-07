import { Button } from '@material-ui/core'
import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useTask } from '../../../../hooks/useTask'
import { selectTask, taskSlice } from '../../slice/taskSlice'
import styles from './css/TaskInput.module.css'

/**
 * タスク入力テキストボックスと登録/更新ボタン
 */
export const TaskInput: FC = memo(() => {
  const { createOrUpdateTaskAsync } = useTask()
  const { inputTask, mode } = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const { setInputTask } = taskSlice.actions

  return (
    <>
      {/* タスク入力テキストボックス */}
      <input
        type="text"
        className={styles.taskInput}
        placeholder="Please input task"
        value={inputTask}
        onChange={(e) => dispatch(setInputTask({ value: e.target.value }))}
        data-testid="task-input"
      />
      {/* 登録/更新ボタン */}
      <div className={styles.btnWrap}>
        <Button
          variant="contained"
          color="primary"
          disabled={!inputTask}
          onClick={async () => await createOrUpdateTaskAsync()}
          data-testid="create-update-btn"
        >
          {mode === 'CREATE' ? 'Create' : 'Update'}
        </Button>
      </div>
    </>
  )
})
