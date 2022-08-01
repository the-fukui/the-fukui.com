<script lang="ts">
import { defineComponent } from 'vue'

const NAVIGATION = [
  {
    id: 'top',
    href: '/',
    name: 'トップ',
  },
  {
    id: 'profile',
    href: '/#profile',
    name: 'プロフィール',
  },
  {
    id: 'blog',
    href: '/blog/',
    name: 'ブログ',
  },
]

export default defineComponent({
  props: {
    showTopButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentPath: {
      type: String,
      required: true,
      default: '/',
    },
  },
  setup(props) {
    const menuItems =
      props.currentPath === '/' && !props.showTopButton
        ? NAVIGATION.filter((item) => {
            return item.href !== '/'
          })
        : NAVIGATION

    return {
      menuItems,
    }
  },
})

//   computed: {
//     menuItems: {
//       get() {
//         if (this.$route.path === '/' && !this.showTopButton) {
//           // トップページかつトップボタンを表示する指定がない時は「トップ」を出さない
//           return NAVIGATION.filter((item) => {
//             return item.href !== '/'
//           })
//         }
//         return NAVIGATION
//       },
//     },
//   },
//   methods: {
//     setUrl(href) {
//       if (href === '/' && this.showTopButton) {
//         // トップページでトップボタンを表示する指定があるときはトップボタンのhrefをハッシュにする
//         return '#top'
//       }
//       return href
//     },
//   },
// }
</script>

<template>
  <nav ref="navigation">
    <ul class="list">
      <li
        v-for="(menu, index) in menuItems"
        :key="menu.id"
        :style="`animation-delay:${index * 0.1}s`"
        class="list__item"
      >
        <a
          :href="menu.href"
          target="_blank"
          rel="noopener"
          class="list__link"
          @click="$emit('click')"
          >{{ menu.name }}
          <img
            src="/img/external.svg"
            class="list__external"
            alt="External Link"
          />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
// _:fullscreen,
// :root {
//   .list__link {
//     padding-top: 5px;
//   }

//   .list__external {
//     padding-bottom: 5px;
//   }
// }

.list {
  display: flex;
  flex-wrap: wrap;
  margin: -5px;

  @include mq-down(sm) {
    display: block;
    margin: get_vw(-10);
  }

  &__item {
    @keyframes slide-in {
      0% {
        opacity: 0;
        transform: translateY(-15px);
      }

      80% {
        opacity: 1;
        transform: translateY(4px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    margin: 5px;
    font-family: $ff-bl;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    background: $black;
    transition: background-color 0.2s;
    animation: slide-in 0.2s steps(5, start) 1 normal both;

    // &:last-child {
    //   margin-right: 0;
    // }

    &:hover {
      background: $red;
    }

    @include mq-down(sm) {
      margin: get_vw(10);
      font-size: get_vw(24);
    }
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 5px;

    @include mq-down(sm) {
      padding: get_vw(10) get_vw(15);
    }
  }

  &__external {
    width: 16px;
    height: auto;
    margin-left: 5px;

    @include mq-down(sm) {
      width: get_vw(16);
      margin-left: get_vw(5);
    }
  }
}
</style>
