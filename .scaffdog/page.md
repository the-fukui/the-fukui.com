---
name: '[@web] page'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter pages name.'
  path:
    message: 'Please enter page path.'
    initial: '/'
    required: false
---

# `packages/web/pages{{ inputs.path }}/{{ inputs.name }}.tsx`

```tsx
import type { GetStaticPropsContext } from 'next'
import React from 'react'

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

  // return {
  //   notFound:true
  // } as const
}

export default function {{ inputs.name | pascal }}(
  props: PageContainerProps<typeof getStaticProps>,
) {
  return <Presenter {...Container(props)} />
}
```
