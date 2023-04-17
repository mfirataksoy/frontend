<template>
  <div>
    <div class="text-center mb-4">
      <button class="shadow-xl mr-1 text-white px-4 w-auto h-12 primary-button rounded-lg hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none " @click="recordingInProgress ? endRecording() : beginRecording()">
        <i class="fas fa-{{ recordingInProgress ? 'stop' : 'play' }}"></i>
        {{ recordingInProgress ? 'End Recording' : 'Begin Recording' }}
      </button>
    </div>
    <audio class="mx-auto" controls :src="audioResultURL" id="resultAudio"></audio>
    <div class="mx-auto recording-indicator bg-red-500 animate-pulse rounded-full pl-4 pr-4 p-2 text-center font-bold text-white" v-if="recordingInProgress">
      Recording in progress...
    </div>
    <button class="mx-auto mt-4 shadow-xl ml-1 text-white px-4 w-auto h-12 primary-button rounded-lg hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" @click="sendAudioToBackend" :disabled="!audioResultURL">
      Send to {{ selectedFamilies.map(item => item.name).join(', ') }}
    </button>
  </div>
</template>

<style>
.primary-button {
  background-color: #1c64f2;
  color: white;
}

.primary-button:hover {
  background-color: #1254c7;
}

.secondary-button {
  background-color: #f1f1f1;
  color: #333;
}

.secondary-button:hover {
  background-color: #d8d8d8;
}

audio {
  margin: 20px 0;
  padding: 10px;
}

.recording-indicator {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
}

button {
  border: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


body {
  background-color: #f7f7f7;
}

</style>

<script>
import { makePost, uploadProfilePic } from "../../common/services/services";

export default {
  props: {
    selectedFamilies: {
      type: Array,
      required: true,
    },
  },
  emits: ["audio-data"],
  setup(props, { emit }) {
    const mediaRecorder = ref(null);
    const recordingInProgress = ref(false);
    const audioResultURL = ref("");
    const audioBlob = ref(null);

    emit("audio-data", audioBlob.value);
    emit("selected-families", props.selectedFamilies);

    

    const beginRecording = () => {
      let audioChunks = [];
      recordingInProgress.value = true;

      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        mediaRecorder.value = new MediaRecorder(stream);
        mediaRecorder.value.start();

        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.value.addEventListener("stop", () => {
          audioBlob.value = new Blob(audioChunks, { type: "audio/mpeg" });
          audioResultURL.value = URL.createObjectURL(audioBlob.value);
          emit("audio-data", audioBlob.value);
        });
      });
    };

    const endRecording = () => {
      if (mediaRecorder.value) {
        mediaRecorder.value.stop();
        recordingInProgress.value = false;
      }
    };

    const sendAudioToBackend = async () => {
      if (!audioResultURL.value) return;

      const formData = new FormData();
      formData.append("file", audioBlob.value, "audio.mp3");

      try {
        const response = await uploadProfilePic(formData);
        console.log("Audio sent successfully:", response);

        const payload = {
          familyId: props.selectedFamilies[0].id,
          audioUrl: response.url,
        };

        const ans = await makePost(payload);
        console.log("Post sent successfully:", ans);
        window.location.reload()
      } catch (error) {
        console.error("Error sending audio to backend:", error);
      }
    };

    return {
      beginRecording,
      endRecording,
      recordingInProgress,
      audioResultURL,
      sendAudioToBackend,
    };
  },
};
</script>

<style>

.custom-black {
  background-color: #272727;
}

.custom-purple {
  background-color: #cabfcb;
}

.custom-black-text {
  border-color: #272727;
}

</style>
