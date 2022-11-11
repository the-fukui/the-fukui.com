import type { FunctionalComponent } from 'preact'
import Imgix, { Picture, Source } from 'react-imgix'
import type { SharedImgixAndSourceProps } from 'react-imgix'

import style from './index.module.scss'

type ContainerProps = {
  className?: string
  src: string
  width: number
  height: number
  alt?: string
}

type PresenterProps = ReturnType<typeof Container>

const Container = (props: ContainerProps) => {
  /** Logic here */

  props.alt = props.alt || ''

  const commonProps: SharedImgixAndSourceProps = {
    src: props.src,
    width: props.width,
    height: props.height,
    disableLibraryParam: true,
    disablePathEncoding: true,
    srcSetOptions: {
      devicePixelRatios: [1, 2],
    },
  }

  const formats = ['webp', 'avif']

  const presenterProps = {
    commonProps,
    formats,
  }
  return { ...props, ...presenterProps }
}

const Presenter: FunctionalComponent<PresenterProps> = ({
  className,
  alt,
  formats,
  commonProps,
}: PresenterProps) => (
  <>
    <Picture>
      {formats.map((format) => (
        <Source
          {...commonProps}
          key={format}
          imgixParams={{ fm: format, fit: 'crop' }}
        />
      ))}
      <Imgix
        {...commonProps}
        imgixParams={{
          w: commonProps.width,
          h: commonProps.height,
          fit: 'crop',
          auto: undefined,
        }}
        className={`${className} ${style.image}`}
        htmlAttributes={{ alt }}
      />
    </Picture>
  </>
)

export default function Image(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
