import type { ComponentChildren, FunctionalComponent } from 'preact'

// import style from './index.module.scss'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
}: PresenterProps) => (
  <svg
    className={`${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 399.4 431.8"
  >
    <path
      d="M65 407h5c5-3 11-1 16-2 3 0 7-1 10 2h6c2-2 4-2 7-2h181c2 0 5 0 7 2h6c1-2 3-2 5-2h26a6 6 0 0 1 5 2h8a7 7 0 0 1 5-2c7 1 13-1 20 2h27v13l-7 1c-2 2-5 1-8 1H18c-4 0-7 1-10-1-3 0-6 1-8-2v-10l6-2h23c2-2 3-2 5-2h26a7 7 0 0 1 5 2Z"
      fill="#ede6d4"
    />
    <path
      d="M75 320c-6-1-8-4-9-10V10c0-4 2-7 6-8a72 72 0 0 1 12-2l8 1h238c5 2 6 7 6 12v296c0 7-2 9-9 11l-7 1H82l-7-1Z"
      fill="#dacdb7"
    />
    <path d="M75 320h252v32l-3 4H79l-4-4Z" fill="#ede6d4" />
    <path d="M8 421h384v9l-5 2a15 15 0 0 1-3 0H16l-8-1Z" fill="#daceb7" />
    <path d="M297 407H102v-11h195ZM65 407H29v-11h36Z" fill="#3f3f3f" />
    <path d="M339 407h-36v-11h36Z" fill="#3f3f3e" />
    <path d="M96 407H70v-11h26Z" fill="#434343" />
    <path d="M372 407h-25l-1-11h26Z" fill="#3f3f3e" />
    <path
      d="M330 16v287c-4 1-246 2-257 0a51 51 0 0 1-1-7V21c0-3-1-5 3-7h247c3 0 6-1 8 2Z"
      fill="#ede6d4"
    />
    <path d="M267 347v-21c4-2 29-2 43-1 4 7 1 15 2 22Z" fill="#aaa18e" />
    <path
      d="m313 35 1 9v151c0 3 0 6-4 9H92l-3-4V38c2-4 5-4 9-4h206a73 73 0 0 1 9 1Z"
      fill="#bab09a"
    />
    <path
      d="M194 262v-14h70l3-6h44c3 8 2 17 1 25-5 2-41 2-46 0l-2-4h-63a56 56 0 0 1-7-1Z"
      fill="#a79f8c"
    />
    <path d="M307 327v15h-14v-12l4-3h10Z" fill="#c8bca7" />
    <path
      d="M98 154V58c0-10 6-15 15-15l45-1 38-1h41l40 1 15 1c6 0 12 6 12 14v12l-19 5a86 86 0 0 0-19 12c-15 12-26 27-39 39-17 16-34 31-54 42a163 163 0 0 1-61 19c-4 0-9 2-13 0l-1-31v-1Z"
      fill="#5e5e5e"
    />
    <path
      d="M99 186a170 170 0 0 0 61-14c12-5 23-12 33-19a203 203 0 0 0 19-16l25-24 22-22c9-9 20-17 33-20l12-2 1 75-1 37c0 9-5 15-15 16h-8l-76 2-64-2h-27c-8-1-13-4-15-11Z"
      fill="#3b3b3b"
    />
    <path d="M98 84h1l-1 1ZM98 154h1l-1 1Z" fill="#5f5d5a" />
    <path
      d="M274 260c0-3-3-2-4-2h-66v-5h70v-3l1-1a73 73 0 0 1 26 0l1 1v10a6 6 0 0 1-4 1h-20a6 6 0 0 1-4-1Z"
      fill="#3d3d3d"
    />
    <path d="M274 260h28l-1 4h-26l-1-4Z" fill="#ece5d3" />
    <path d="M302 250h-28l2-4h25l1 4Z" fill="#ebe4d2" />
    <path d="M304 340h-7c-2-7-1-9 4-11 3 3 4 7 3 11Z" fill="#3e3e3d" />
  </svg>
)

export default function SvgPc(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
