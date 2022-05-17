import type { GetStaticPropsContext } from 'next'

const Presenter: React.FC<PresenterProps<typeof useContainer>> = ({}) => (
  <div></div>
)

const useContainer = (props: ContainerProps<typeof getStaticProps>) => {
  /** Logic here */

  const presenterProps = {}
  return { ...props, ...presenterProps }
}

export const getStaticProps = async ({}: GetStaticPropsContext) => {
  return {
    props: {},
    revalidate: 60,
  }
}

export default function Template(props: ContainerProps<typeof getStaticProps>) {
  return <Presenter {...useContainer(props)} />
}
