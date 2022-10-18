/**
 * 指定の要素がスクロールされたかどうかを判定する
 * 指定要素のclassに、交差時にはintersectedを、完全にスクロールしきった場合にはpassedbyを付与する
 */
export const watchIsScrolled = () => {
  console.log(document.querySelectorAll('[data-watch-is-scrolled]'))
  // 所定のカスタムデータを持つ要素を取得、オプションを取得
  const targets = Array.from(
    document.querySelectorAll('[data-watch-is-scrolled]'),
  ).map((element) => {
    const optionAttribute = element.getAttribute('data-watch-is-scrolled')

    const options: IntersectionObserverInit | undefined = (() => {
      try {
        return optionAttribute ? JSON.parse(optionAttribute) : undefined
      } catch (e) {
        console.error(e)
        return undefined
      }
    })()

    return { element, options }
  })

  const createIO = ({
    root = null,
    rootMargin = '-100px',
    threshold = 0,
  }: IntersectionObserverInit = {}) =>
    new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('intersected')
            // entry.target.classList.remove('passedby')
            // } else {
            //   entry.target.classList.add('passedby')
          }
        }
      },
      { root, rootMargin, threshold },
    )

  const defaultIO = createIO()

  targets.forEach((target) => {
    console.log('Observer registered', { target })

    //option指定がある場合は、新規でIntersectionObserverを発行する
    if (target.options) {
      const io = createIO(target.options)
      io.observe(target.element)
      return
    }

    defaultIO.observe(target.element)
  })
}
