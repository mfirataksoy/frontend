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
      user: useUserStore()
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
        this.profilePicUrl = response.profilePicUrl;
        this.birthDate = response.birthDate;
        this.phoneNumber = response.phoneNumber;
      } catch (error) {
        console.error(error);
      }
    },
    async submitForm() {
      try {
        this.updateProfilePic();
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
        this.submitForm()
        window.location.reload()
        console.log("Updated profile picture");
      } catch (error) {
        console.error(error);
      }
    },
    handleProfilePictureChange(event) {
      this.selectedProfilePicture = event.target.files[0];
      this.updateProfilePic();
    },
  },
};
</script>




<template>



<!-- component -->
<!-- component -->
<div class="bg-white-100 min-h-screen pt-2  p-10 my-16">
  <h1 class="text-6xl font-bold text-black mx-auto text-shadow " style="font-family: 'Keepsake'"> Settings </h1>
  <div class="custom-black-text border-b-2 font-bold mb-10 ml-10 mr-10 mt-10"></div>
        <div class="container mx-auto">
            <div class="inputs w-full max-w-2xl p-16 mx-auto shadow-xl custom-black rounded-xl">
              <div class="custom-black rounded-xl">
                <label for="profile-picture" class="block w-30 h-30 rounded-full mx-auto mb-10 shadow-lg hover:scale-115 transition-all ease-out duration-200 cursor-pointer">
                <img class="w-full h-full object-cover rounded-full" :src="user.currentUser?.profilePicUrl ||'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" alt="Profile Picture">
              </label>
              <input id="profile-picture" type="file" class="shadow-lg" @change="handleProfilePictureChange" style="display:none">

                <h2 class="text-2xl text-white font-bold">Account Settings</h2>
                <form class="mt-6 border-t border-gray-400 pt-4">
                    <div class='flex flex-wrap -mx-3 mb-6'>
                        <div class='w-full md:w-full px-3 mb-6'>
                            <label class='block tracking-wide text-white text-lg font-bold mb-2' for='grid-text-1'>Email Address</label>
                            <input v-model="email" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' id='grid-text-1' type='text' placeholder='Enter email'  required>
                        </div>
                        <div class='w-full md:w-full px-3 mb-6 '>
                            <label class='block tracking-wide text-white text-lg font-bold mb-2'>Password</label>
                            <button class="bg-green-100 rounded-md text-black font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300">Change Your Password</button>
                        </div>

                        <div class="Personal w-full border-t border-gray-400 pt-4">
                            <h2 class="text-2xl text-white font-bold">Personal Info:</h2>
                            <div class="flex items-center justify-between mt-4">
                                <div class='w-full md:w-1/2 px-3 mb-6'>
                                    <label class='block tracking-wide text-white text-lg font-bold mb-2' >First Name</label>
                                    <input v-model="firstName" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required>
                                </div>
                                <div class='w-full md:w-1/2 px-3 mb-6'>
                                    <label class='block tracking-wide text-white text-lg font-bold mb-2' >Last Name</label>
                                    <input v-model="lastName" class='appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500' type='text'  required>
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <button @click="submitForm" class="bg-green-100 rounded-md text-black font-bold py-2 px-4 rounded shadow-lg hover:scale-110 transition duration-300" type="submit">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </form>
              </div>
            </div>
        </div>
    </div>

</template>

<style>

.custom-black {
  background-color: #272727;
}

.custom-black-text {
  border-color: #272727;
}

</style>
