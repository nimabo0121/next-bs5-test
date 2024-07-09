import Container from 'react-bootstrap/Container'
// import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'

import React from 'react'

export default function MemberNavbar() {
  document.addEventListener('DOMContentLoaded', function () {
    var navLinks = document.querySelectorAll('.nav-link')

    navLinks.forEach(function (link) {
      if (window.location.href.includes(link.getAttribute('href'))) {
        link.classList.add('active')
      }
    })

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault() // 防止默認鏈接行為

        navLinks.forEach(function (otherLink) {
          otherLink.classList.remove('active')
        })

        this.classList.add('active')

        var url = this.getAttribute('href')

        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('content').innerHTML = xhr.responseText
          }
        }
        xhr.open('GET', url, true)
        xhr.send()
      })
    })
  })
  return (
    <Container>
      <div className="">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/member/profile"
            >
              會員資料
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              aria-current="page"
              href="/member/profile-password"
            >
              密碼修改
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " aria-current="page" href="#/">
              我的訂單
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " aria-current="page" href="#/">
              歷史訂單
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link " aria-current="page" href="#/">
              專屬優惠
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  )
}
