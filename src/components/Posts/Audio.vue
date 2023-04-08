<template>
  <div>
    <div class="text-center mb-4">
      <button class=" shadow-xl mr-1 text-white px-4 w-auto h-12 bg-blue-600 rounded-lg hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none " @click="beginRecording">
        Begin Recording
      </button>
      <button class=" shadow-xl ml-1 text-white px-4 w-auto h-12 bg-red-600 rounded-lg hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none " @click="endRecording">
        End Recording
      </button>
    </div>
    <audio class="mx-auto" controls :src="audioResultURL" id="resultAudio"></audio>
    <div class=" mx-auto mt-4 mb-4 bg-red-500 animate-pulse rounded-full pl-4 pr-4 p-2 text-center font-bold text-white " v-if="recordingInProgress">Recording in progress...</div>

    <button
  class="mx-auto mt-4 shadow-xl ml-1 text-white px-4 w-auto h-12 bg-gray-400 rounded-lg hover:bg-gray-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
  @click="sendAudioToBackend"
  :disabled="!audioResultURL"
>
  Send to {{ selectedFamilies.map(item => item.name).join(', ') }}
</button>

  </div>
</template>

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
          audioBlob.value = new Blob(audioChunks, { type: "audio/mp3" });
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
