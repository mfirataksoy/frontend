

<script>
import { ref } from 'vue';
import { makePost, uploadProfilePic, increasePostCount, getAccountDetails } from "../../common/services/services";
import Alert from "../Notification/Alert.vue"; // Import the Alert component

// ...


export default {
  props: {
    selectedFamilies: {
      type: Array,
      required: true,
    },
  },
  components: {
    Alert,
  },
  emits: ["audio-data"],
  setup(props, { emit }) {
    const mediaRecorder = ref(null);
    const recordingInProgress = ref(false);
    const audioResultURL = ref("");
    const audioBlob = ref(null);
    const user = useUserStore()
    const errorMessage = ref(""); // Add a ref for errorMessage
    const errorVisible = ref(false); // Add a ref for errorVisible

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
    const current = await getAccountDetails(user.currentUser?._id);
    if(current.postsCount > 20) throw new Error("You have reached the maximum amount of posts you can make.")
    
    const response = await uploadProfilePic(formData);
    const payload = {
      familyId: props.selectedFamilies[0].id,
      audioUrl: response.url,
    };

    const ans = await makePost(payload);
    const res = await increasePostCount(user.currentUser?._id);

    window.location.reload()

    // Additional code...
  } catch (error) {
    errorVisible.value = true;
    errorMessage.value = "You have reached the maximum amount of posts you can make.";
  }

};



    return {
      Alert,
      beginRecording,
      endRecording,
      recordingInProgress,
      audioResultURL,
      sendAudioToBackend,
      errorVisible,
      errorMessage,
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

<template>
  <div>
    <div class="text-center mb-4">
      <div class="flex justify-between">
        <button 
          class="shadow-xl mr-1 text-white px-4 w-auto h-12 rounded-lg hover:opacity-80 transition ease-in duration-200 focus:outline-none"
          :class="recordingInProgress ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600'"
          :disabled="recordingInProgress"
          @click="beginRecording()"
        >
          <i class="fas fa-play mr-1"></i>
          Begin Recording
        </button>

        <button 
          class="shadow-xl mr-1 text-white px-4 w-auto h-12 rounded-lg hover:opacity-80 transition ease-in duration-200 focus:outline-none"
          :class="recordingInProgress ? 'bg-red-600' : 'bg-gray-500 cursor-not-allowed'"
          :disabled="!recordingInProgress"
          @click="endRecording()"
        >
          <i class="fas fa-stop mr-1"></i>
          End Recording
        </button>
      </div>
    </div>

    <audio class="mx-auto" controls :src="audioResultURL" id="resultAudio"></audio>

    <div class="mx-auto recording-indicator bg-red-500 animate-pulse rounded-full pl-4 pr-4 p-2 text-center font-bold text-white" v-if="recordingInProgress">
      Recording in progress...
    </div>

    <div class="text-center">
      <button class="mx-auto mt-4 shadow-xl ml-1 text-black px-4 w-auto h-12 bg-white rounded-lg  active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none" @click="sendAudioToBackend" :disabled="!audioResultURL">
        <template v-if="selectedFamilies.length > 0">
          Send to: {{ selectedFamilies.map(item => item.name).join(', ') }}
        </template>
        <template v-else>
          <span class="text-red text-lg font-bold">No family selected</span>
        </template>
      </button>
      <div v-if="errorVisible">
      <Alert :error="{title: errorMessage, body: 'Please upgrade your member plan and try again.'}"></Alert> 
    </div>
    </div>
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
