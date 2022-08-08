import React, { useEffect } from 'react'

// import style from './index.module.scss'

type ContainerProps = {
  className?: string
}

const Presenter: React.FC<PresenterProps<typeof Container>> = ({
  className,
}) => <div className={`${className}`}>aaa</div>

const Container = (props: ContainerProps) => {
  useEffect(() => {
    console.log('Container')
  }, [])

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export default function Test(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
