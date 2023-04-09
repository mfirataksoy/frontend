<script setup lang="ts">
import type { Family } from '~/stores/types'
import { services } from '~/common/services/services'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import axios from 'axios';

const props = defineProps<{
  family: Family
}>()

const family = props.family
const isOpen = ref(false);
const familyClosed = ref(false)//await services.openCloseFamily(family._id);


const user = useUserStore()

const isAdmin = computed(() => {
  return family?.adminUser?.email === user.currentUser?.email;
});

function closeModal() {
  isOpen.value = false;
}
async function openModal() {
  isOpen.value = true;
}


async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

function  sendInviteEmail() {
    const recipient = '';
    const subject = 'Join my family!';
    const body = `Hey!\n\nI wanted to invite you to join my family online. We've created a space where we can stay connected and share our stories.\n\nTo join, just click on this link: [www.keepsakeproject.com]. You'll need to create an account or log in if you haven't already. Then, just copy the following family code into the family page and you're in!\n\nMy family code: ${family.code}\n\nWe'd love to have you as a part of our family. Hope to see you online soon!\n\nCheers,\n${family.adminUser.firstName}`;

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_self');
  }

  async function handleFamilyClose() {
    familyClosed.value = !familyClosed.value
    const updatedFamily = family;
    const res = await services.closeFamily(family._id);
    //change for prod
    console.log(updatedFamily)
  }

  async function handleFamilyOpen(){
    familyClosed.value = !familyClosed.value
    const updatedFamily = family;
    const res = await services.openFamily(family._id);
    //change for prod
    console.log(updatedFamily)
  }


// async function handleFamilyClose() {
//   familyClosed.value = !familyClosed.value
//   const updatedFamily = family;
//   updatedFamily.isAvailibleForNewMembers = familyClosed.value;
//   const updateFamily = await services.updateFamily(family._id, updatedFamily)
//   console.log(updateFamily)
// }

async function deleteFamily(id: string) {
  const deleteConfirmation = await services.deleteFamily(id)
  window.location.reload()
  console.log(deleteConfirmation)
}

async function removeUser(userId: string) {

  //delete user from family
  const updatedFamily = family;
  const updatedMembers = family.members.filter(member => member._id !== userId);
  updatedFamily.members = updatedMembers
  const updateFamily = await services.updateFamily(family._id, updatedFamily)
  window.location.reload()
  console.log(updateFamily)

  //delete family in user
  //const updatedUser = await services.getUser(userId)
  //console.log(updatedUser)
  //const updatedUserFamilies = updatedUser.familyId.filter(family => family._id !== userId)
  //updatedUser = updatedUser
}

async function leaveFamily() {
  const userId = user.currentUser?._id;
  if (typeof userId === 'string') {
    await removeUser(userId);
    window.location.reload();
  } else {
    console.error('User ID is not a valid string:', userId);
  }
}





</script>

<template>
  <div class="flex flex-wrap bg-white md:w-1/2 lg:w-1/3 rounded-lg ">
    <div class="w-full  px-4 mb-8">
      <div class="rounded-lg p-6">
        <div class="flex justify-center">
        <h1 class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md font-bold text-white text-xl text-center px-4 py-2 shadow-lg">
          {{ family.name }}
        </h1>
      </div>

        <p class="text-gray-4000 mb-4">
          <!-- Created on: {{ format(new Date(family.createdDate), 'MM/dd/yyyy') }} -->
        </p>
        <p class="text-2xs font-bold mb-4">
          <button v-if="isAdmin" @click="openModal" class="bg-gray-300 hover:bg-gray-400  py-2 px-4 rounded-xl mr-2 hover:scale-102 transition-all ease-out duration-200 cursor-pointer">
            <font-awesome-icon class=" transform hover:scale-110 transition duration-300" :icon="['fas', 'gear']" style="color: #000000;" />
            <div>
              <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" class="relative z-10" @close="closeModal">
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                  </TransitionChild>

                  <div class="fixed inset-0 overflow-y-auto">
                    <div
                      class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                      <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                      >
                        <DialogPanel
                          class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <DialogTitle
                            as="h3"
                            class="text-center text-2xl font-bold leading-6 text-gray-900"
                          >
                            {{family.name}} Settings
                          </DialogTitle>
                          <div class="mt-5">
                            <button v-if="!familyClosed" @click="handleFamilyClose" class="mr-1 bg-gradient-to-r from-green-600 to-green-800 rounded-md hover:from-green-800  hover:to-green-900 text-white font-bold py-2 px-4 rounded shadow-lg">
                              Open to New Members
                            </button>
                            <button v-else @click="handleFamilyOpen" class="mr-1 bg-gradient-to-r from-red-600 to-red-800 rounded-md hover:from-red-800  hover:to-red-900 text-white font-bold py-2 px-4 rounded shadow-lg">
                              Closed to New Members
                            </button>
                            <button class="ml-1 bg-gradient-to-r from-red-600 to-red-800 rounded-md hover:from-red-800  hover:to-red-900 text-white font-bold py-2 px-4 rounded shadow-lg" @click="deleteFamily(family._id)">
                              Delete {{ family.name }}
                            </button>
                            <div>
                              <table class="table-auto">
                                <thead>
                                  <tr>
                                    <th class="px-4 py-2 text-left">First Name</th>
                                    <th class="px-4 py-2 text-left">Last Name</th>
                                    <th class="px-4 py-2 text-left">Email</th>
                                    <th class="px-4 py-2">Remove</th>
                                  </tr>
                                </thead>
                                <tbody class="overflow-auto">
                                  <tr v-for="member in family.members" :key="member._id">
                                    <td class="border px-4 py-2">{{ member.firstName }}</td>
                                    <td class="border px-4 py-2">{{ member.lastName }}</td>
                                    <td class="border px-4 py-2">{{ member.email }}</td>
                                    <td class="border px-4 py-2">
                                      <p v-if="member.email === family?.adminUser?.email">Admin</p>
                                      <button v-else @click="removeUser(member._id)" class="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-800 hover:to-red-900 py-2 px-4 rounded-xl mr-2 hover:scale-102 transition-all ease-out duration-200 cursor-pointer">
                                        <font-awesome-icon :icon="['fas', 'trash']" style="color: #000000;" />
                                      </button>
                                      
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                            </div>
                            <button
                              type="button"
                              class="text-white inline-flex mr-2 justify-center rounded-md border border-transparent bg-gray-400 hover:bg-gray-500 px-4 py-2 text-sm font-bold text-blue-900 mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              @click="closeModal"
                            >
                              Back
                            </button>

                          </div>
                  


                          
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
            </div>
          </button>
          <button v-else @click="openModal" class="text-white bg-red-500 hover:bg-red-600  py-2 px-4 rounded-xl mr-2 hover:scale-102 transition-all ease-out duration-200 cursor-pointer">
            Leave
            <div>
              <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" class="relative z-10" @close="closeModal">
                  <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                  >
                    <div class="fixed inset-0 bg-black bg-opacity-25" />
                  </TransitionChild>

                  <div class="fixed inset-0 overflow-y-auto">
                    <div
                      class="flex min-h-full items-center justify-center p-4 text-center"
                    >
                      <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                      >
                        <DialogPanel
                          class="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                          <DialogTitle
                            as="h3"
                            class="text-center text-2xl font-bold leading-6 text-gray-900"
                          >
                            Are you sure you would like to leave?
                          </DialogTitle>
                          <div class="mt-5">
                            <div class="flex justify-center">
                              <button @click="leaveFamily" class="w-20 mr-1 bg-gradient-to-r from-green-600 to-green-800 rounded-md hover:from-green-800  hover:to-green-900 text-white font-bold py-2 px-4 rounded shadow-lg">
                              Yes
                            </button>
                            <button  @click="closeModal" class="w-20 mr-1 bg-gradient-to-r from-red-600 to-red-800 rounded-md hover:from-red-800  hover:to-red-900 text-white font-bold py-2 px-4 rounded shadow-lg">
                              No
                            </button>
                            </div>
                          </div>
                        </DialogPanel>
                      </TransitionChild>
                    </div>
                  </div>
                </Dialog>
              </TransitionRoot>
            </div>
          </button>
          <button class="bg-gray-300 text-black font-bold rounded-xl shadow-md py-2 px-4 hover:bg-gray-400 hover:scale-102 transition-all ease-out duration-200 cursor-pointer" 
          @click="copyToClipboard(family.code)">
          Copy Invite ID: {{ family.code }}
          </button>
          <button class="bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-xl ml-2 hover:scale-102 transition-all ease-out duration-200 cursor-pointer" @click="sendInviteEmail">
            <font-awesome-icon :icon="['fas', 'envelope']" style="color: #000000;" />
          </button>

        </p>
        <h2 class="text-xl font-bold mb-4 text-black">
          Family Lead
        </h2>
        <div v-if="family?.adminUser" class="flex mb-4 justify-center rounded-xl shadow-lg p-4 bg-gray-100">
          <img :src="family.adminUser.profilePicUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" alt="Admin User" class="w-12 h-12 rounded-full mr-4">
          <div>
            <p class="text-gray-400">
              Name: {{ family.adminUser.firstName }} {{ family.adminUser.lastName }}
            </p>
            <p class="text-gray-400">
              Email: {{ family.adminUser.email }}
            </p>
          </div>
        </div>
        <h2 class="text-xl font-bold mb-4 text-black">
          Members
        </h2>
        <div class="flex flex-wrap rounded-xl bg-gray-100 shadow-lg p-4">
          <div
            v-for="member in family.members" :key="member._id"
            class="w-full md:w-1/2 lg:w-1/3 px-4 mb-4 hover:scale-105 transition-all ease-out duration-200 cursor-pointer"
          >
            <div class="p-4 bg-gray-200 rounded-lg shadow-md">
              <div class="flex justify-center mt-2 mb-3">
                <img :src="member.profilePicUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'" alt="Admin User" class="w-12 h-12 rounded-full mr-4 justify-center">
              </div>
              <p class="text-black font-bold mb-2">
                {{ member.firstName }} {{ member.lastName }}
              </p>
              <p class="text-gray-400 mb-2 truncate ">
                {{ member.email }}
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8">
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
