<script setup lang="ts">
import { addSeconds, format } from 'date-fns'
import { ref, watch } from 'vue'
import VueWaveSurfer from '~/common/constants/VueWaveSurfer/VueWaveSurfer.vue';
//import { VueWaveSurfer } from 'vue-wavesurfer';



const props = defineProps({
  src: String,
})
const playing = ref(false)
const audio = ref<HTMLAudioElement | null>(null)
const audioDuration = ref(0)
const audioProgressPercentage = ref(0)
const progressRef = ref<HTMLDivElement | null>(null)
const visualRef = ref<typeof VueWaveSurfer | null>(null); // Add reference to the VueWaveSurfer component

const options = {
  waveColor: '#fff',
  progressColor: '#fff',
  cursorColor: '#fff',
  barWidth: 5,
  barRadius: 3,
  cursorWidth: 3,
  height: 200,
  barGap: 3
}


function playAudio() {
  visualRef.value?.waveSurfer.playPause();
  if (!playing.value) {
    audio?.value?.play()
    playing.value = true
  }
  else {
    audio?.value?.pause()
    playing.value = false
  }
}

function updateAudioProgress() {
  audioProgressPercentage.value = (audio?.value?.currentTime || 0) / (audio?.value?.duration || 1) * 100
}

function updateAudioDuration() {
  audioDuration.value = audio?.value?.duration || 0
}

function formattedTime(seconds: number) {
  const helperDate = addSeconds(new Date(0), seconds)
  return format(helperDate, 'mm:ss')
}

watch(
  () => audio.value,
  (newAudio, oldAudio) => {
    const handleDurationChange = () => {
      if (newAudio && isFinite(newAudio.duration)) {
        updateAudioDuration();
      }
    };

    if (oldAudio) {
      oldAudio.removeEventListener('timeupdate', updateAudioProgress);
      oldAudio.removeEventListener('loadedmetadata', handleDurationChange);
      oldAudio.removeEventListener('durationchange', handleDurationChange);
    }

    if (newAudio) {
      newAudio.addEventListener('timeupdate', updateAudioProgress);
      newAudio.addEventListener('loadedmetadata', handleDurationChange);
      newAudio.addEventListener('durationchange', handleDurationChange);
    }
  },
  { immediate: true }
);

function updateCurrentTime(event: MouseEvent) {
  const { offsetX } = event
  const width = progressRef.value?.clientWidth || 2
  const percentage = offsetX / width
  //  audio?.value?.currentTime = (audio?.value?.duration * percentage)
}
</script>

<template>
  <div class="flex items-center">
    <div class="flex-1">
      <div class="flex justify-center items-center gap-2 text-white">
        <span>{{ '00:00' }}</span>
        <span>{{ audioDuration ? formattedTime(audioDuration) : '??:00' }}</span>
      </div>
      <div class="relative rounded-lg overflow-hidden border-2 custom-white-border">
        <VueWaveSurfer ref="visualRef" class="soundVisualization absolute top-0 left-0 w-full h-full" :src="props.src" :options="options"></VueWaveSurfer>
        <audio ref="audio" :src="props.src" preload="metadata" class="w-full"></audio>
      </div>
      <div class="flex justify-center items-center gap-2 text-white mt-2">
        <span>{{ audioDuration ? formattedTime(audioDuration) : '??:00' }}</span>
      </div>
      <div class="flex justify-center items-center mt-2">
        <button class="p-2 border custom-white-border rounded-full flex items-center text-white" @click="playAudio">
          <div v-if="!playing" class="custom-white-text" i-carbon-play inline-block />
          <div v-else class="custom-white-text" i-carbon-pause inline-block />
        </button>
      </div>
    </div>
  </div>
</template>

<style>

.custom-black {
  background-color: #272727;
}

.custom-purple {
  background-color: #cabfcb;
}

.custom-black-text {
  color: #272727;
}

.custom-black-border {
  border-color: #272727;
}

.custom-white {
  background-color: #ffffff;
}

.custom-white-border {
  border-color: #ffffff;
}

.custom-white-text {
  color: #ffffff;
}

</style>

