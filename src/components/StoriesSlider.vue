<template>
  <div
    ref="elRef"
    class="
      stories-slider
      bg-[#202124]
      fixed
      left-0
      top-0
      w-full
      h-full
      z-[1000]
      transform
      scale-0
      translate-x-0 translate-y-0 translate-z-0
      scale-50
      pt-11
      pb-11
      box-border
      flex
      items-center
      justify-center
    "
  >
    <div
      class="
        swiper
        h-full
        w-full
        max-w-[414px] max-h-[896px]
        z-[2]
        bg-[#35363a]
        rounded-lg
      "
    >
      <button
        v-if="pauseButtonVisible"
        @click="onPauseTribute()"
        class="
          pause-btn
          absolute
          top-1/2
          right-1/2
          translate-x-1/2
          -translate-y-1/2
          z-[100]
        "
      >
        <v-icon name="bi-pause-circle-fill" scale="4" />
      </button>
      <button
        v-else-if="resumeButtonVisible"
        @click="onResumeTribute()"
        class="
          resume-btn
          absolute
          top-1/2
          right-1/2
          translate-x-1/2
          -translate-y-1/2
          z-[100]
        "
      >
        <v-icon name="bi-play-circle-fill" scale="4" />
      </button>
      <div class="swiper-wrapper">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
// TODO: lots of things we can remove since we only need a single story player
import { ref, onMounted, onBeforeUnmount } from 'vue';
import createStoriesSlider from '../stories-slider.js';

export default {
  props: {
    swiper: {
      type: [Object, Function],
      default: undefined,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    autoplayDuration: {
      type: Number,
      default: 5000,
    },
  },
  emits: [
    'storiesSlider',
    'pauseTribute',
    'resumeTribute',
    'autoplayStart',
    'autoplayStop',
  ],
  setup(props, ctx) {
    const elRef = ref(null);
    const storiesSliderRef = ref(null);
    const pauseButtonVisible = ref(false);
    const resumeButtonVisible = ref(false);
    const onPauseTribute = () => {
      ctx.emit('pauseTribute');
      resumeButtonVisible.value = true;
    };
    const onResumeTribute = () => {
      ctx.emit('resumeTribute');
    };

    onMounted(() => {
      storiesSliderRef.value = createStoriesSlider(elRef.value, {
        Swiper: props.swiper,
        enabled: props.enabled,
        autoplayDuration: props.autoplayDuration,
        onAutoplayStart(...args) {
          ctx.emit('autoplayStart', ...args);
          setTimeout(() => {
            pauseButtonVisible.value = true;
          }, 500);
        },
        onAutoplayStop(...args) {
          ctx.emit('autoplayStop', ...args);
          setTimeout(() => {
            pauseButtonVisible.value = false;
          }, 500);
        },
      });
      ctx.emit('storiesSlider', storiesSliderRef.value);
    });

    onBeforeUnmount(() => {
      if (storiesSliderRef.value && storiesSliderRef.value.destroy) {
        storiesSliderRef.value.destroy();
      }
    });

    return {
      elRef,
      onPauseTribute,
      onResumeTribute,
      pauseButtonVisible,
      resumeButtonVisible,
    };
  },
};
</script>

<style scoped>
.pause-btn,
.resume-btn {
  @apply opacity-0 transition-all;
}
.swiper:hover .pause-btn,
.swiper:hover .resume-btn {
  @apply opacity-75;
}
.pause-btn:hover,
.resume-btn:hover {
  @apply opacity-100 !important;
}
</style>
