<script setup lang="ts">
import { format } from 'date-fns'
import type { Post } from '~/stores/types'
import { services } from '~/common/services/services'
import type { Family } from '~/stores/types'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps<{
  post: Post
  family: Family
}>()

const user = useUserStore()
const post = props.post
const family = props.family

// const family = computed(async () => {
//   const familyData = await services.getFamily(post._id);
//   return familyData;
// });

//const familyData = computed(() => family.value)

// const isAdmin = computed(async () => {
//   const familyData = await family.value;
//   return familyData?.adminUser?.email === user.currentUser?.email;
// });

// const isAdmin = computed(async () => {
//   return user.currentUser?._id === post.postedBy.adminUser
// });

const ownsPost = computed(() => {
  return user.currentUser?._id === post.postedBy?._id
});

const isAdmin = computed(() => {
  console.log(family)
 // return user.currentUser?._id === family.adminUser;
});


async function deletePost() {
  const deleteConfirmation = await services.deletePost(post._id)
  console.log(deleteConfirmation)
  console.log(post.familyId)
  window.location.reload()
}




// rest of the code

const isOpen = ref(false);
const emptyProfilePic = 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png'

function closeModal() {
  isOpen.value = false;
}
async function openModal() {
  isOpen.value = true;
}

</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md">
    <div class="flex">
      <div class="flex flex-col ">
        <p class="text-sm text-gray-600 mb-4">
          <ul v-if="post.familyId && post.familyId.length > 0">
            <li v-for="familyId in post.familyId" :key="familyId._id">
              {{ familyId.familyName }}
            </li>
          </ul>
        </p>
        <img class="w-30 h-30 rounded-full object-cover" :src="post.postedBy?.profilePicUrl || emptyProfilePic" alt="">
        <p class="text-gray-800 text-lg">
          {{ post.postedBy?.firstName }}
          {{ post.postedBy?.lastName }}
        </p>

        <!--     <p class="text-sm text-gray-600 mb-4">
        Description: {{ post.description }}
        </p> -->
        <p class="text-sm text-gray-600 mb-4" />


        <div />
      </div>
      <div class="w-full px-5 flex flex-col">
        <p class="text-sm text-gray-600 mb-4   text-right">
          {{ format(new Date(post?.createdAt?.toString() || new Date()), 'dd MMMM yyyy hh:mm') }}
        </p>
        <AudioPlayer :src="post.audioUrl" />
      </div>
    </div>

    <button v-if="ownsPost || isAdmin" @click="openModal" class="text-xs float-right text-white bg-red-500 hover:bg-red-600  py-2 px-4 rounded-xl mr-2 hover:scale-102 transition-all ease-out duration-200 cursor-pointer">
            <font-awesome-icon :icon="['fas', 'trash']" style="color: #000000;" />
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
                            Are you sure you would like to delete this post?
                          </DialogTitle>
                          <div class="mt-5">
                            <div class="flex justify-center">
                              <button @click="deletePost" class="w-20 mr-1 bg-gradient-to-r from-green-600 to-green-800 rounded-md hover:from-green-800  hover:to-green-900 text-white font-bold py-2 px-4 rounded shadow-lg">
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

  </div>

</template>

<style>

</style>
