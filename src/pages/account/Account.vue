<script>
import { httpClient } from "~/common/services/httpClient";
import { services } from "~/common/services/services";
export default {
  data() {
    return {
      secretId: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      phoneNumber: "",
      profilePicUrl: "",
      selectedProfilePicture: null,
    };
  },
  created() {
    this.fetchAccountDetails();
  },
  methods: {
    async fetchAccountDetails() {
      try {
        const response = await services.getAccountDetails();
        this.secretId = response._id;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.email = response.email;
        this.birthDate = response.birthDate;
        this.phoneNumber = response.phoneNumber;
      } catch (error) {
        console.error(error);
      }
    },
    async submitForm() {
      try {
        const response = await services.editAccountDetails({
          _id: this.secretId,
          firstName: this.firstName,
          lastName: this.lastName,
          birthDate: this.birthDate,
          phoneNumber: this.phoneNumber,
          profilePicUrl: this.profilePicUrl,
        });

        console.log("finished update");
      } catch (error) {
        console.error(error);
        console.log("here");
      }
    },
    async updateProfilePic() {
  try {
    if (!this.selectedProfilePicture) {
      console.error('No profile picture selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedProfilePicture, this.selectedProfilePicture.name);

    const response = await services.uploadProfilePic(formData);
    console.log(response)
    this.profilePicUrl = response.url;

    console.log("finished update");
  } catch (error) {
    console.error(error);
    console.log("here");
  }
}
,
    handleProfilePictureChange(event) {
      this.selectedProfilePicture = event.target.files[0];
    },
  },
};
</script>

<template>
  <div>
    <h1 class="text-2xl mt-10" font-bold dark:text-white>
      Edit Your Account Details
    </h1>
  </div>
  <div class="h-2xl">
    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex justify-center"
    >
      <div class="flex flex-col gap-1 max-w-xl" w="300px">
        <label class="text-gray-700 text-left" for="name"> First name </label>
        <input
          v-model="firstName"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        />
        <label class="text-gray-700 text-left" for="name"> Last name </label>
        <input
          v-model="lastName"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        />
        <label class="text-gray-700 text-left" for="email"> Email </label>
        <input
          v-model="email"
          class="border border-gray-300 p-2 rounded-lg"
          type="email"
        />
        <label class="text-gray-700 text-left" for="birthDate">
          Birth Date
        </label>
        <input
          v-model="birthDate"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        />
        <label class="text-gray-700 text-left" for="phoneNumber">
          Phone Number
        </label>
        <input
          v-model="phoneNumber"
          class="border border-gray-300 p-2 rounded-lg"
          type="text"
        />
        <button class="btn mt-2 text-lg" @click="submitForm">
          Update Information
        </button>
        <label class="text-gray-700 text-left" for="profilePicture">
          Profile Picture
        </label>

        <input
          class="border border-gray-300 p-2 rounded-lg"
          type="file"
          @change="handleProfilePictureChange"
        />

        <button class="btn mt-2 text-lg" @click="updateProfilePic">
          Update Profile Picture
        </button>
      </div>
    </div>
  </div>
</template>
