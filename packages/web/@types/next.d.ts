type GetSSRResult<TProps> =
  | { props: TProps }
  | { redirect: any }
  | { notFound: true }
type GetSSRFn<TProps extends any> = (args: any) => Promise<GetSSRResult<TProps>>
type inferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<
  infer TProps
>
  ? NonNullable<TProps>
  : never

type PageContainerProps<T> = inferSSRProps<T>
type PresenterProps<T> = ReturnType<T>

type _NextApiRequest = import('next').NextApiRequest
type _NextApiResponse<T> = import('next').NextApiResponse<T>
type APIErrorMessage = { Error: { Message: string } }
interface NextApiRequest<T extends NextApiRequest['query'], K extends Object>
  extends _NextApiRequest {
  query: T
  body: K
}

type NextApiHandler<
  T extends _NextApiRequest['query'],
  K extends Object,
  P extends any,
> = (
  req: NextApiRequest<T, K>,
  res: _NextApiResponse<P | APIErrorMessage>,
) => void | Promise<void>
