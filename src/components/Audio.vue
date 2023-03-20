<template>
    <div>
      <div>
        <button class="btn btn-success" @click="beginRecording">
          Begin Recording
        </button>
        <button class="btn btn-danger" @click="endRecording">
          End Recording
        </button>
      </div>
      <div v-if="recordingInProgress">Recording in progress...</div>
      <audio controls :src="audioResultURL" id="resultAudio"></audio>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    emits: ['audio-data'],
    setup(_, { emit }) {
      const mediaRecorder = ref(null);
      const recordingInProgress = ref(false);
      const audioResultURL = ref('');
  
      const beginRecording = () => {
        let audioChunks = [];
        recordingInProgress.value = true;
  
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          mediaRecorder.value = new MediaRecorder(stream);
          mediaRecorder.value.start();
  
          mediaRecorder.value.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };
  
          mediaRecorder.value.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            audioResultURL.value = URL.createObjectURL(audioBlob);
            emit('audio-data', audioBlob);
          });
        });
      };
  
      const endRecording = () => {
        if (mediaRecorder.value) {
          mediaRecorder.value.stop();
          recordingInProgress.value = false;
        }
      };
  
      return {
        beginRecording,
        endRecording,
        recordingInProgress,
        audioResultURL,
      };
    },
  };
  </script>
  