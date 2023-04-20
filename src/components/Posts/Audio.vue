

<script>
import { ref } from 'vue';
import { makePost, uploadProfilePic, increasePostCount } from "../../common/services/services";
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
  console.log('sendAudioToBackend called');

  if (!audioResultURL.value) return;
  console.log(user.currentUser?._id);
  const formData = new FormData();
  formData.append("file", audioBlob.value, "audio.mp3");

  try {
    console.log('Trying to increasePostCount');
    const res = await increasePostCount(user.currentUser?._id);

    // Add these lines to check the response
    if (!res || res.error) {
      throw new Error(res.error || 'Error in response');
    }


        const response = await uploadProfilePic(formData);
        console.log("Audio sent successfully:", response);

        const payload = {
          familyId: props.selectedFamilies[0].id,
          audioUrl: response.url,
        };

        const ans = await makePost(payload);
        console.log("Post sent successfully:", ans);
        window.location.reload()

    // Additional code...
  } catch (error) {
    errorVisible.value = true;
    errorMessage.value = "You have reached the maximum amount of posts you can make.";
  }

  console.log('After catch block');
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
    <div v-if="errorVisible">
      <Alert :error="{title: errorMessage, body: 'Please upgrade your member plan and try again.'}"></Alert> 
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