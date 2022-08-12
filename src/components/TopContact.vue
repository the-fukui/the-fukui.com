<template>
  <section id="contact" class="contact">
    <h2
      :data-watch-is-scrolled="JSON.stringify({ rootMargin: '-100px' })"
      class="contact__title"
    >
      CONTACT
    </h2>
    <form ref="form" class="section form" @submit.prevent="submit()">
      <div
        :class="{
          'form__header--sending': formOption.sending && !formOption.sent,
        }"
        class="form__header"
      >
        <div class="form__description">
          ご連絡は下記フォームよりお気軽にどうぞ
        </div>
        <!-- <f-img ref="stamp" src="mail.png" alt="Mail" class="form__mail-icon" /> -->
        <div class="form__item form__item--date">
          <span class="form__item-title">DATE</span
          ><span class="form__item-val">{{ getDate }}</span>
        </div>
        <div class="form__item">
          <label class="form__item-title" for="contact__name"
            >NAME<span class="form__item-required">*</span></label
          ><input
            id="contact__name"
            v-model="form.name"
            :disabled="formOption.sending"
            class="form__item-val"
            required
          />
        </div>
        <div class="form__item">
          <label class="form__item-title" for="contact__mail"
            >E-MAIL<span class="form__item-required">*</span></label
          ><input
            id="contact__mail"
            v-model="form.email"
            :disabled="formOption.sending"
            class="form__item-val"
            type="email"
            required
          />
        </div>
      </div>
      <div
        :class="{
          'form__body--sending': formOption.sending && !formOption.sent,
        }"
        class="form__body"
      >
        <label class="form__body-title" for="contact__body"
          >MESSAGE HERE:<span class="form__item-required">*</span></label
        ><textarea
          id="contact__body"
          ref="contact__message"
          v-model="form.message"
          :disabled="formOption.sending"
          required
          class="form__body-val"
          @input="autoChangeFieldHeight"
        />
      </div>
      <div class="form__footer">
        <button
          :disabled="formOption.sending"
          class="form__submit"
          type="submit"
        >
          送信
        </button>
      </div>
      <!-- <f-img
        :class="{ 'form__sent--active': formOption.sent }"
        src="sent.png"
        alt="Message has been sent"
        class="form__sent"
      /> -->
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        accessKey: import.meta.env.STATIC_FORMS_TOKEN,
        replyTo: '@',
      },
      formOption: {
        sending: false,
        sent: false,
      },
    }
  },
  computed: {
    getDate() {
      const d = new Date()
      return d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    },
  },
  methods: {
    autoChangeFieldHeight(e) {
      const target = e.target
      // 一旦1行にして、最低でどれぐらいスクロール必要かを計測して反映
      target.style.height = '40px'
      // 5行を超えたら=スクロールに入ったら自動で大きくする
      if (target.scrollHeight > 200) {
        target.style.height = target.scrollHeight + 'px'
      } else {
        target.style.height = '200px'
      }
    },
    submit() {
      this.$nuxt.$loading.start()
      this.formOption.sending = true
      const form = this.$refs.form
      form.reportValidity()

      if (!form.checkValidity()) {
        this.$nuxt.$loading.finish()
        this.formOption.sending = false
        return
      }

      // 確認ダイアログ
      if (window.confirm('メッセージを送信します。よろしいですか？')) {
        this.$axios
          .post(
            'https://api.staticforms.xyz/submit',
            JSON.stringify(this.form),
            {
              headers: { 'Content-Type': 'application/json' },
            }
          )
          .then((res) => {
            if (res.data.success) {
              this.$nuxt.$loading.finish()
              this.formOption.sent = true
            }
          })
          .catch((e) => {
            alert('エラーが発生しました。もう一度お試し下さい。')
            this.$nuxt.$loading.finish()
            this.formOption.sending = false
          })
      } else {
        this.$nuxt.$loading.finish()
        this.formOption.sending = false
      }
    },
    dammy() {
      return false
    },
  },
}
</script>
<style lang="scss" scoped>
@use 'sass:color';

.contact {
  &__title {
    margin: 120px 0;
    font-size: 6rem;
    color: white;
    text-align: center;
    background: #333;
    transition: letter-spacing 0.3s ease-out, margin 0.3s ease-out;
    @include ff-gill-nova;

    @include mq-down(md) {
      font-size: 4rem;
    }

    @include mq-down(sm) {
      margin: get_vw(60) -1em get_vw(60) 0;
      font-size: get_vw(25);
    }

    &.intersected {
      margin-right: -1em;
      letter-spacing: 1em;
    }
  }
}

.form {
  position: relative;
  width: 100%;

  input,
  textarea {
    outline: 0;
  }

  &__header {
    position: relative;
    padding: 30px 60px;
    padding-bottom: 45px;
    border: 2px solid #333;
    border-bottom: none;
    transition: background 0.2s;

    &--sending {
      background: rgb(255 255 255 / 40%);
    }

    @include mq-down(sm) {
      padding: get_vw(60) get_vw(15) get_vw(35) get_vw(15);
    }
  }

  &__mail-icon {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.17, 0.92, 0.14, 0.96),
      transform 0.4s cubic-bezier(0.17, 0.92, 0.14, 0.96);
    transform: translateY(-50%) translateX(15%) rotate(15deg) scale(1.4);

    &.intersected {
      opacity: 1;
      transform: translateY(-50%) translateX(15%) rotate(15deg) scale(1);
    }

    :deep(.img) {
      @include mq-down(md) {
        width: 180px;
        height: auto;
      }

      @include mq-down(sm) {
        width: get_vw(150);
        height: auto;
      }
    }
  }

  &__description {
    margin-bottom: 25px;
    text-align: center;

    @include mq-down(sm) {
      margin-bottom: get_vw(45);
    }
  }

  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;

    @include mq-down(sm) {
      margin-bottom: get_vw(15);
    }

    &:last-child {
      margin-bottom: 0;
    }

    &--date {
      justify-content: flex-end;
      width: auto;

      .form__item-val {
        flex: none;
        width: auto;
      }
    }
  }

  &__item-title {
    @include ff-gill-nova;

    margin-right: 10px;
    font-size: 2rem;
    white-space: nowrap;
  }

  &__item-required {
    margin-left: 3px;
    font-size: 1.6rem;
    font-weight: bold;
    color: color.adjust($red, $lightness: -5%);
    vertical-align: super;
  }

  &__item-val {
    flex: 1 1 0%;
    width: 100%;
    padding: 0 10px;
    letter-spacing: 1px;
    border-bottom: dotted 2px #333;

    // @keyframes on-auto-fill-start {
    //   from {
    //   }

    //   to {
    //   }
    // }

    // &:-webkit-autofill {
    //   transition: background-color 50000s ease-in-out 0s;
    //   animation-name: on-auto-fill-start;
    // }
  }

  &__body {
    width: 100%;
    padding: 30px 60px 60px;
    padding-top: 30px;
    border: 2px solid #333;
    transition: background 0.2s;

    &--sending {
      background: rgb(255 255 255 / 40%);
    }

    @include mq-down(sm) {
      padding: get_vw(30) get_vw(15) get_vw(60) get_vw(15);
    }
  }

  &__body-title {
    @include ff-gill-nova;

    display: block;
    margin-bottom: 10px;
    font-size: 2rem;
  }

  &__body-val {
    width: 100%;
    height: 200px; // 1行40pxなので5行
    background: {
      size: 5px 2.5em;
      image: linear-gradient(
        -135deg,
        transparent 93%,
        black 94.5%,
        black 98.9%,
        transparent 99%
      );
    }

    line-height: 2.5em;
    letter-spacing: 1px;
    resize: none;
  }

  &__footer {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  &__submit {
    position: relative;
    z-index: auto;
    padding: 5px 15px;
    font-family: $ff-bl;
    font-size: 2rem;
    font-weight: bold;
    color: $black;
    border: 2px solid $black;
    transition: background 0.2s, color 0.2s, border-color 0.2s;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 0%;
      height: 100%;
      content: '';
      background: $black;
      transition: width 0.2s;
    }

    &:hover {
      color: white;

      &::after {
        width: 100%;
      }
    }

    &:active {
      color: $black;
      background: white;
      border-color: white;
    }
  }

  &__sent {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    visibility: hidden;
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.17, 0.92, 0.14, 0.96);
    transform: translateX(-50%) translateY(-50%) rotateZ(20deg) scale(1.5);

    &:deep(.img) {
      max-width: 80vw;
      height: auto;
    }

    &--active {
      visibility: visible;
      opacity: 1;
      transform: translateX(-50%) translateY(-50%) rotateZ(20deg) scale(1);
    }
  }
}
</style>
