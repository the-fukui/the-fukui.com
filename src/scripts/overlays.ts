export const overlays = () => {
  const $hamburger = document.getElementById('hamburger')
  const $hamburgerClosed = document.getElementById('hamburger-closed')

  const setStickyHamburgerButton = (state: boolean) => {
    ;[$hamburger, $hamburgerClosed].forEach((hamburger) => {
      state
        ? hamburger?.classList.add('button-hamburger--sticky')
        : hamburger?.classList.remove('button-hamburger--sticky')
    })
  }

  const setShowHamburgerButton = (state: boolean) => {
    ;[$hamburger, $hamburgerClosed].forEach((hamburger) => {
      state
        ? hamburger?.classList.add('button-hamburger--show')
        : hamburger?.classList.remove('button-hamburger--show')
    })
  }

  let scrollTimeout: NodeJS.Timer | null = null

  const scrollState = {
    prev: 0,
    upFrom: 0,
    downFrom: 0,
  }

  const overlaysState = {
    preventToTopButton: false,
  }

  const watchScroll = () => {
    if (scrollTimeout) return

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null
      const currentScroll = window.scrollY || window.pageYOffset

      // トップへ戻るボタンについて
      if (currentScroll > scrollState.prev) {
        // 下にスクロール時
        if (currentScroll > 50) {
          setStickyHamburgerButton(true)
        }
        if (currentScroll - scrollState.downFrom > 100) {
          // 100px下スクロールすると隠す
          // window.toTopButton = false
          setShowHamburgerButton(false)
        }
        // どこまでスクロールしたか記憶
        scrollState.upFrom = currentScroll
      } else if (
        scrollState.upFrom - currentScroll > 200 &&
        currentScroll > 150 &&
        overlaysState.preventToTopButton // TODO:記事ページでのロジック
      ) {
        // 200px戻ったときにメニューを表示させる
        // window.toTopButton = true
        setShowHamburgerButton(true)
        scrollState.downFrom = currentScroll
      } else if (currentScroll < 150) {
        // window.toTopButton = false
        setShowHamburgerButton(false)
        if (currentScroll < 100) {
          setStickyHamburgerButton(false)
        }
      }
      scrollState.prev = currentScroll
    }, 300)
  }

  window.addEventListener('scroll', watchScroll, { passive: true })
}
