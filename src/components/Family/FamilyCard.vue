<script setup lang="ts">
import type { Family } from '~/stores/types'
const props = defineProps<{
  family: Family
}>()

async function closeFamily() {
  // await services.closeFamily(props.family._id)
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


const family = props.family
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
          <button class="bg-gray-300 text-black font-bold rounded-xl shadow-md py-2 px-4 hover:scale-105 transition-all ease-out duration-200 cursor-pointer" 
          @click="copyToClipboard(family.code)">
          Copy Invite ID: {{ family.code }}
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" @click="sendInviteEmail">Click me to send an email</button>

        </p>
        <h2 class="text-xl font-bold mb-4 text-black">
          Admin User
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
          <button class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800  hover:to-blue-900 text-white font-bold py-2 px-4 rounded shadow-lg" @click="closeFamily">
            Close to public
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>
