type PageContainerProps<
  T extends import('next').GetStaticProps | import('next').GetServerSideProps,
> = T extends import('next').GetStaticProps
  ? import('next').InferGetStaticPropsType<T>
  : T extends import('next').GetServerSideProps
  ? import('next').InferGetServerSidePropsType<T>
  : never
type PresenterProps<T> = ReturnType<T>
