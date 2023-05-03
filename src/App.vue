<script>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper';
import 'swiper/css';
import StoriesSlider from './components/StoriesSlider.vue';
import Story from './components/Story.vue';
export default {
  components: {
    StoriesSlider,
    Story,
  },
  setup() {
    let storiesSlider = null;
    let audio = null;
    const playButtonVisible = ref(true);
    const audioTrackURL = ref('audio.mp3');

    const loadTribute = () => {
      // add "in" class to animate
      storiesSlider.el.classList.add('stories-slider-in');
    };

    const playTribute = () => {
      // enable slider (as we passed enabled: false initially)
      storiesSlider.enable();
      // add "intro-playing" class to disble pointer-events during intro
      //storiesSlider.el.classList.add('intro-playing');
      // remove the "intro-playing" class after 7 seconds
      //setTimeout(() => {
      //  storiesSlider.el.classList.remove('intro-playing');
      //}, 7000);
      // hide play button
      playButtonVisible.value = false;
      // delay playTrack method for 7 seconds (7000 milliseconds)
      //setTimeout(() => {
      // play background music
      //  playTrack(audioTrackURL.value, 0.25);
      //}, 7000);
    };

    const playTrack = (track, volume = 1.0) => {
      if (track) {
        audio = new Audio(track);
        audio.volume = volume; // Set the volume (default is 1.0)
        audio.play();
      }
    };

    const onStoriesSlider = (instance) => {
      storiesSlider = instance;
    };

    const onPauseTribute = () => {
      if (audio) {
        audio.pause(); // Pause the audio
      }
      storiesSlider.pauseTribute();
    };

    const onResumeTribute = () => {
      if (audio) {
        audio.play(); // Resume the audio
      }
      storiesSlider.resumeTribute();
    };

    onMounted(() => {
      loadTribute();
    });

    // stories data
    const tributeData = [
      {
        recipient: {
          avatar: 'pete.jpg',
          name: 'Graduation Tribute for Pete',
        },
        stories: [
          /*{
            html: '<div class="flex items-center justify-center w-screen h-screen bg-[#6fd0b6]"><button class="play-btn absolute inset-0 flex items-center justify-center z-10"><svg data-v-7a7a37b1="" class="ov-icon" aria-hidden="true" width="76.8" height="76.8" viewBox="-1.6 -1.6 19.2 19.2" fill="currentColor" style="font-size: 4.8em;"><path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.79 5.093A.5.5 0 006 5.5v5a.5.5 0 00.79.407l3.5-2.5a.5.5 0 000-.814l-3.5-2.5z"></path></svg></button></div>',
          },*/
          {
            video: 'intro.mp4',
          },
          /*
          {
            video: 'title.mp4',
          },*/
          {
            video: 'intro.mp4',
          },
          {
            participant: 'Jimmy',
            video: 'jimmy.mp4',
          },
          {
            participant: 'Laurel',
            video: 'laurel.mp4',
          },
          {
            participant: 'Emma',
            video: 'emma.mp4',
          },
          {
            participant: 'Marc',
            video: 'mark.mp4',
          },
          {
            participant: 'Luke',
            video: 'luke.mp4',
          },
        ],
      },
    ];

    return {
      Swiper,
      loadTribute,
      playTribute,
      playTrack,
      playButtonVisible,
      tributeData,
      onStoriesSlider,
      onPauseTribute,
      onResumeTribute,
    };
  },
};
</script>

<template>
  <!-- Stories Slider -->
  <StoriesSlider
    :swiper="Swiper"
    :enabled="false"
    :autoplay-duration="5000"
    @storiesSlider="onStoriesSlider"
    @pauseTribute="onPauseTribute"
    @resumeTribute="onResumeTribute"
  >
    <button
      v-if="playButtonVisible"
      @click="() => playTribute()"
      class="
        play-btn
        hidden
        absolute
        inset-0
        flex
        items-center
        justify-center
        z-10
        opacity-75
        hover:opacity-100
        transition-opacity
      "
    >
      <v-icon name="bi-play-circle-fill" scale="4" />
    </button>
    <!-- Tribute stories -->
    <Story
      v-for="(tributeStory, tributeStoryIndex) in tributeData[0].stories"
      :key="tributeStoryIndex"
      :recipient="tributeData[0].recipient.name"
      :participant="tributeStory.participant"
    >
      <template v-slot:avatar>
        <img
          :src="tributeData[0].recipient.avatar"
          class="w-full h-full rounded-full object-cover object-center"
        />
      </template>
      <video
        v-if="tributeStory.video"
        :src="tributeStory.video"
        playsinline
        preload="metadata"
        class="
          object-contain object-center
          block
          border-none
          outline-none
          bg-transparent
        "
      />
      <div
        v-else-if="tributeStory.html"
        v-html="tributeStory.html"
        class="
          object-cover object-center
          block
          border-none
          outline-none
          bg-transparent
        "
      />
      <img
        v-else
        :src="tributeStory.image"
        class="
          object-cover object-center
          block
          border-none
          outline-none
          bg-transparent
        "
      />
    </Story>
  </StoriesSlider>
</template>

<style scoped>
.intro-playing {
  @apply pointer-events-none;
}
.intro-playing .pause-btn,
.intro-playing .play-btn {
  @apply hidden;
}
</style>
