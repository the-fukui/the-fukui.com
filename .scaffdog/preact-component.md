---
name: 'preact component'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter component name.'
---

# `src/components/{{ inputs.name | pascal }}/index.tsx`

```tsx
import type { FunctionalComponent, ComponentChildren } from 'preact'

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
}: PresenterProps) => <div className={`${className}`}></div>

export default function {{ inputs.name | pascal }}(props: ContainerProps) {
  return <Presenter {...Container(props)} />
}
```

# `src/components/{{ inputs.name | pascal }}/index.module.scss`

```scss

```
