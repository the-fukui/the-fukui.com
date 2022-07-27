<script lang="ts">
import TheNavigation from './TheNavigation.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    currentPath: {
      type: String,
      required: true,
      default: '/',
    },
  },
  components: {
    TheNavigation,
  },
  setup(props) {
    return {
      currentPath: props.currentPath,
    }
  },
})
</script>

<template>
  <header id="top" class="header">
    <div class="logos">
      <img
        src="/img/logo.svg"
        class="logos__1"
        alt=""
        width="556.719"
        height="100.714"
      />
      <img
        src="/img/logo.svg"
        class="logos__2"
        alt=""
        width="556.719"
        height="100.714"
      />
      <img
        src="/img/logo.svg"
        class="logos__3"
        alt=""
        width="556.719"
        height="100.714"
      />
      <h1>
        <img
          src="/img/logo.svg"
          class="logos__main"
          alt="ふくいのふ"
          width="556.719"
          height="100.714"
        />
      </h1>
    </div>
    <div class="description">
      <div class="description__mask"></div>
      <h2 class="description__text">WEB ENGINEER</h2>
    </div>
    <TheNavigation class="the-navigation" :currentPath="currentPath" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  transform-origin: right calc(100% - 45px - 50px);
  transform: translateY(-100%) translateY(95px) rotateZ(-15deg);

  @include mq-down(md) {
    transform: translateY(calc(-75% + 45px + 50px)) rotateZ(-15deg);
  }
}

.logos {
  background: $red;
  padding: 15px;
  position: relative;

  @include mq-down(md) {
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      background: $red;
      position: absolute;
      left: 99%;
      top: 0;
    }
  }

  &__1,
  &__2,
  &__3,
  &__main {
    display: block;
    transform-origin: left top;
    margin-top: 5px;
    max-width: 100%;
    height: auto;
  }

  &__1 {
    //２番めも移動しているので、２番めの移動量も足す必要がある（60% + 60%）
    transform: translateY(120%) scale(0.4);
    // @include mq-down(md) {
    //   transform: translateY(160%) scale(0.3);
    // }
  }

  &__2 {
    transform: translateY(60%) scale(0.6);
    // @include mq-down(md) {
    //   transform: translateY(100%) scale(0.4);
    // }
  }

  &__3 {
    transform: translateY(20%) scale(0.8);
    // @include mq-down(md) {
    //   transform: translateY(50%) scale(0.6);
    // }
  }
}

.description {
  display: flex;
  padding-top: 15px;
  height: 45px;
  width: calc(100% - 12.057px);

  @include mq-down(md) {
    height: 40px;
  }

  @include mq-down(sm) {
    height: get_vw(40);
  }

  &__mask {
    width: 100%;
    background: $black;
    flex: 1 1 0%;
  }

  &__text {
    @include ff-gill-inline();
    font-size: 3rem;
    padding: 0px 15px;

    @include lhCrop();

    @include mq-down(md) {
      font-size: 2.5rem;
    }

    @include mq-down(sm) {
      font-size: get_vw(25);
      padding: 0 get_vw(15);
    }
  }
}

.the-navigation {
  height: 50px;
  padding-top: 15px;
  width: calc(100% - 34px);

  @include mq-down(sm) {
    display: none;
  }
}
</style>
