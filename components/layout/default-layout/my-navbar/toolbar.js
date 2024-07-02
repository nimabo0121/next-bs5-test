import Image from 'next/image'
import Link from 'next/link'
import styles from './toolbar.module.scss'
// 讀取登入訊息
import { initUserData, useAuth } from '@/hooks/use-auth'
// 處理登出
import { logout, getUserById } from '@/services/user'
import toast, { Toaster } from 'react-hot-toast'
import MemberTop from '@/components/member/member-top'

export default function Toolbar({ handleShow }) {
  const { auth } = useAuth()
  // 登入後設定全域的會員資料用
  const { setAuth } = useAuth()

  // 處理登出
  const handleLogout = async () => {
    const res = await logout()

    console.log(res.data)

    // 成功登出個回復初始會員狀態
    if (res.data.status === 'success') {
      toast.success('已成功登出')

      setAuth({
        isAuth: false,
        userData: initUserData,
      })
    } else {
      toast.error(`登出失敗`)
    }
  }

  // 未登入時，不會出現頁面內容
  if (!auth.isAuth) return <></>

  return (
    <ul className="navbar-nav pe-2 ms-auto">
      <li className="nav-item">
        <Link
          className="nav-link  btn btn-outline-light"
          href="/cart"
          role="button"
          title="購物車"
        >
          <i className="bi bi-cart-fill"></i>
          <p className="d-none d-md-inline d-lg-none"> 購物車</p>
        </Link>
      </li>
      <li
      // className="nav-item dropdown"
      // className={`nav-item dropdown ${styles['dropdown']}`}
      >
        <Link
          className="nav-link dropdown-toggle btn btn-outline-light"
          href=""
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          title="會員中心"
        >
          <i className="bi bi-person-circle"></i>
          <p className="d-none d-md-inline d-lg-none">會員中心</p>
        </Link>
        <ul
          className={`dropdown-menu dropdown-menu-end p-4 mw-100 ${styles['slideIn']} ${styles['dropdown-menu']}`}
        >
          <li>
            <p className="text-center">
              <MemberTop />
            </p>
            <p className="text-center">
              會員姓名: {auth.userData.name}
              <br />
              帳號: {auth.userData.username}
              <br />
              <button className="btn btn-primary w-100" onClick={handleLogout}>
                登出
              </button>
            </p>
          </li>
          <li>
            <Link className="dropdown-item text-center" href="/member/profile">
              會員管理區
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item text-center " href="/about">
              客服中心
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <span
          className="nav-link  btn btn-outline-light"
          role="presentation"
          onClick={(e) => {
            e.preventDefault()
            handleShow()
          }}
          title="展示"
        >
          <i className="bi bi-mortarboard-fill"></i>
          <p className="d-none d-md-inline d-lg-none"> 展示</p>
        </span>
      </li>
    </ul>
  )
}
