import type { GetStaticPropsContext } from 'next'

const Presenter: React.FC<PresenterProps<typeof Container>> = ({}) => (
  <div></div>
)

const Container = (props: PageContainerProps<typeof getStaticProps>) => {
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

export default function Template(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
