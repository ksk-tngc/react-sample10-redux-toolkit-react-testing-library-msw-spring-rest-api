import { FC, memo } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useAppSelector } from '../../../../app/hooks'
import { useLogout } from '../../../../hooks/useLogout'
import { selectLogin } from '../../../login/slice/loginSlice'
import styles from './css/TaskHeader.module.css'

/**
 * タスクメイン領域のヘッダ部
 */
export const TaskHeader: FC = memo(() => {
  const { logout } = useLogout()
  const { principalUser } = useAppSelector(selectLogin)

  return (
    <>
      {/* ログアウトボタン */}
      <button
        className={styles.logoutBtn}
        onClick={logout}
        data-testid="logout-btn"
      >
        <FaSignOutAlt />
      </button>
      {/* ログインユーザー名 */}
      <div className={styles.userName} data-testid="login-username">
        {principalUser.username}
      </div>
      {/* タイトル */}
      <h1 className={styles.title} data-testid="header-title">
        Today's Task
      </h1>
    </>
  )
})
