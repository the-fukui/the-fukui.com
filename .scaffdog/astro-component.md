---
name: 'astro component'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter component name.'
---

# `src/components/{{ inputs.name | pascal }}/index.astro`

```astro
---
export interface Props extends astroHTML.JSX.HTMLAttributes {}

const { class: className, ...attributes } = Astro.props as Props
---

<div class={`${className}`} {...attributes}></div>

<style scoped lang="scss">

</style>
```
