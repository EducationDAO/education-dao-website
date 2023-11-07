"use client"
import React, { useEffect, useRef, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Image from 'next/image'
import clsx from 'clsx';
import styles from './navBar.module.scss'
import Link from 'next/link'
import Logo from '@/assets/icons/logo.svg';
import DiscordLogo from '@/assets/icons/discord-logo.svg';
import TwitterLogo from '@/assets/icons/twitter-logo.svg';
import MetaMaskLogo from '@/assets/icons/metamask-fox-logo.svg';

type MenuItemProps = {
  items: {
    title: string,
    url: string,
    newTab: boolean,
    icon?: string,
  }[]
}

function Menu({ items }: MenuItemProps) {
  return (
    <>
      <ul className={styles.menuList}>
        {
          items.map((item, index) => <li key={index}>
            <a href={item.url} target={item.newTab ? "_blank" : "_self"}>
              {item.icon && <Image src={item.icon} alt={item.title} width={24} height={24} />}
              {item.title}
            </a>
          </li>)
        }
      </ul>
      <div className={styles.connectWallet}>
        <Image src={MetaMaskLogo} alt="MetaMask Fox" width={24} height={22} />
        <span>Connect with MetaMask</span>
      </div>
    </>
  )
}

function NavBar() {
  const overlayMenuRef = useRef(null)
  const [toggle, toggleNav] = useState(false);

  useEffect(() => {
    if (!overlayMenuRef?.current) return;

    if (toggle) {
      disableBodyScroll(overlayMenuRef.current);
    } else {
      enableBodyScroll(overlayMenuRef.current)
    }
  }, [toggle])

  const navItems = [
    {
      title: "About",
      url: "#",
      newTab: true,
    },
    {
      title: "Discord",
      url: "#",
      newTab: true,
      icon: DiscordLogo,
    },
    {
      title: "Twitter",
      url: "#",
      newTab: true,
      icon: TwitterLogo,
    }
  ]
  return (
    <div>
      <div className={styles.headerPlaceholder} />
      <header className={clsx(styles.container, { [styles.open]: toggle })}>
        <div className={styles.wrapper}>
          <nav className={styles.innerWrapper}>
            <div className={styles.imageWrapper}>
              <Link href="/">
                <Image src={Logo} alt="Education DAO logo" width={64} height={64} />
              </Link>
            </div>
            <div className={styles.right}>
              <Menu items={navItems} />
            </div>
            <button className={clsx(styles.toggleIcon, { [styles.open]: toggle })} onClick={() => toggleNav(!toggle)}>
              <div />
              <div />
              <div />
            </button>
          </nav>
        </div>
        <div ref={overlayMenuRef} className={clsx(styles.menuOverlay, { [styles.open]: toggle })}>
          <Menu items={navItems} />
        </div>
      </header>
    </div>
  )
}

export default NavBar