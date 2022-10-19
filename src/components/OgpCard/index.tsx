import bg from '@/public/img/bg.jpg?inline'
import dirtySurface from '@/public/img/dirty_surface.png?inline'
import logo from '@/public/img/logo.png?inline'

import type { ComponentChildren, FunctionalComponent } from 'preact'

type ContainerProps = {
  className?: string
  children?: ComponentChildren
  title: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  let { title } = props
  if (title.length > 50) {
    title = title.slice(0, 50) + '...'
  }

  const presenterProps = {
    title,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  title,
}: PresenterProps) => (
  // inline styleしか対応していない（satori）
  <div
    className={`${className}`}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundImage: `url(${bg})`,
      backgroundColor: '#cbbea4',
      backgroundRepeat: 'repeat',
      width: '100%',
      height: '100%',
    }}
  >
    {/* 黒帯 */}
    <div
      style={{
        width: '40vw',
        height: '100vh',
        backgroundColor: '#333',
        position: 'absolute',
        right: '10vw',
        top: 0,
        transform: 'skewX(-45deg)',
        transformOrigin: 'right top',
      }}
    />
    {/* 青帯 */}
    <div
      style={{
        width: '30vw',
        height: '100vh',
        backgroundColor: '#094f64',
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'skewX(15deg)',
        transformOrigin: 'right top',
      }}
    />
    {/* 赤帯 */}
    <div
      style={{
        width: '100vw',
        height: '50vh',
        backgroundColor: '#b23f3f',
        position: 'absolute',
        transform: 'skewY(8deg)',
        transformOrigin: 'right top',
        top: '35vh',
      }}
    />
    <div
      style={{
        width: '100vw',
        height: '40vh',
        top: '45vh',
        backgroundColor: '#b23f3f',
        position: 'absolute',
        transform: 'skewY(-4deg)',
        transformOrigin: 'right top',
      }}
    />
    {/* テキスト */}
    <span
      style={{
        fontSize: 60,
        color: 'white',
        width: '90vw',
        marginLeft: '5vw',
        marginTop: '5vw',
      }}
    >
      {title}
    </span>
    {/* ロゴ */}
    <img
      src={logo}
      alt=""
      width={1200}
      height={217}
      style={{
        width: '25vw',
        height: 217 * (25 / 1200) + 'vw',
        position: 'absolute',
        top: '5vw',
        right: '1vw',
        transform: 'rotate(-13deg)',
        transformOrigin: 'center center',
      }}
    />
    {/* 汚れテクスチャ */}
    <img
      src={dirtySurface}
      alt=""
      width={800}
      height={800}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: '0.5',
      }}
    />
    {/* ビネット */}
    <div
      style={{
        boxShadow: 'inset 0 0 200px black',
        opacity: '0.7',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: '999',
      }}
    />
  </div>
)

export default function OgpCard(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
