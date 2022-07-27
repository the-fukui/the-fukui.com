<template>
  <div class="vignette" />
</template>

<style lang="scss" scoped>
.vignette {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  box-shadow: inset 0 0 200px black;
  opacity: 0.7;

  @include mq-down(md) {
    box-shadow: inset 0 0 100px black;
  }
}
</style>
