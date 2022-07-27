<template>
  <div class="vignette" />
</template>

<style lang="scss" scoped>
.vignette {
  box-shadow: inset 0 0 200px black;
  opacity: 0.7;

  @include mq-down(md) {
    box-shadow: inset 0 0 100px black;
  }
}
</style>
