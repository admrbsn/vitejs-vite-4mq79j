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
    const audioTrackURL = ref(
      'https://storage.googleapis.com/tribute-music-prod/116_full_where-we-go-2_0152.mp3'
    );

    const loadTribute = () => {
      // add "in" class to animate
      storiesSlider.el.classList.add('stories-slider-in');
    };

    const playTribute = () => {
      // enable slider (as we passed enabled: false initially)
      storiesSlider.enable();
      // add "intro-playing" class to disble pointer-events during intro
      storiesSlider.el.classList.add('intro-playing');
      // remove the "intro-playing" class after 7 seconds
      setTimeout(() => {
        storiesSlider.el.classList.remove('intro-playing');
      }, 7000);
      // hide play button
      playButtonVisible.value = false;
      // delay playTrack method for 7 seconds (7000 milliseconds)
      setTimeout(() => {
        // play background music
        playTrack(audioTrackURL.value, 0.25);
      }, 7000);
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
          {
            video:
              'https://player.vimeo.com/progressive_redirect/playback/823050002/container/62ab6732-5368-4c89-8b11-e8fe6f614de1/7ef5f6da-7ed8875c?expires=1683129391&loc=external&signature=f4552b8e9978b9a428e1cfef6dbdcf85fffb4953a740d6ecdf0b8462df627ac0',
          },
          {
            video: 'title.mp4',
          },
          {
            participant: 'Jimmy',
            video:
              'jimmy.mp4',
          },
          {
            participant: 'Laurel',
            video:
              'https://ziggeo-to-b2-production.b-cdn.net/b4c980a3eeaab8e269703fb0b4500992-6232c9e678eb9b396e37297848351fa2.mp4',
          },
          {
            participant: 'Emma',
            video:
              'https://tribute-video-upload-production.b-cdn.net/6ac651d04bff4b56acab2eb0fa64eeae_ba9f1a1a4c95749cc1c29c34ff893630_3f6513d14789c23b3d28a7844b58e729.mp4',
          },
          {
            participant: 'Marc',
            video:
              'https://ziggeo-to-b2-production.b-cdn.net/a71c0a9d1fd46b6ba5821053d0eb2886-91a2cfa7fabc4e1a72f7d7b114a70045.mp4',
          },
          {
            participant: 'Luke',
            video:
              'https://ziggeo-to-b2-production.b-cdn.net/fa832c1c272a203e8f33d66b9355982a-e1a2f414073232931f50d3aaaa1c81a4.mp4',
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
