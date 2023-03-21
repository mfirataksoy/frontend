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
    <button
      class="btn btn-primary"
      @click="sendAudioToBackend"
      :disabled="!audioResultURL"
    >
      Send to {{ selectedFamilies }}
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
