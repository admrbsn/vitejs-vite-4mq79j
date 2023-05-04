<script>
export default {
  props: {
    vimeoId: { type: Number, default: undefined },
    avatar: { type: String, default: undefined },
    recipient: { type: String, default: undefined },
    participant: { type: String, default: undefined },
    duration: { type: Number, default: undefined },
  },
};
</script>
<template>
  <div
    class="swiper-slide rounded-md overflow-hidden"
    :data-vimeo-id="vimeoId"
    :data-duration="duration"
  >
    <a
      :href="userLink"
      class="
        stories-slider-user
        flex
        items-center
        absolute
        top-4
        left-3
        h-8
        z-[300]
        mt-3
        text-white
        select-none
      "
    >
      <div
        v-if="avatar || $slots.avatar"
        class="stories-slider-user-avatar w-9 h-9 rounded-full mr-3"
      >
        {{ avatar || '' }}
        <slot name="avatar" />
      </div>
      <div class="leading-snug">
        <div
          v-if="recipient || $slots.recipient"
          class="stories-slider-user-name mr-3 text-sm font-bold"
        >
          {{ recipient || '' }}
          <slot name="recipient" />
        </div>
        <div
          v-if="participant || $slots.participant"
          class="stories-slider-user-date text-sm"
        >
          From {{ participant || '' }}
          <slot name="participant" />
        </div>
      </div>
    </a>

    <div
      class="
        stories-slider-content
        w-full
        h-full
        relative
        z-[100]
        flex
        items-center
        justify-center
        select-none
      "
    >
      <slot />
    </div>
  </div>
</template>
