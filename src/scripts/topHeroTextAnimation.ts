export const topHeroTextAnimation = () => {
  const $text = document.getElementById('js-heroText')

  // 高さ取得しておき、アニメーション時でも高さをキープ
  const height = $text?.clientHeight
  $text?.setAttribute('style', `min-height: ${height}px`)

  // 一文字ずつ表示させる
  const text = $text?.textContent
  if (text) {
    $text.textContent = ''
    $text.style.visibility = 'visible'
    let i = 0
    const timer = setInterval(() => {
      if (i > text.length) {
        clearInterval(timer)
        return
      }
      $text.textContent = text?.slice(0, i++)
    }, 100)
  }
}
