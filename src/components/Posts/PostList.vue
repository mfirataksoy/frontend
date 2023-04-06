<script setup lang="ts">
import { getPosts, getFamilies, getFeed } from '~/common/services/services'
import type { Post } from '~/stores/types'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Ref } from 'vue';

const posts = ref([]);


interface Family {
  _id: string;
  name: string;
  // Add any other properties here
}

const families = ref<Family[] | null>(null);
const loading = ref<boolean>(false)
const isOpen = ref(false);
const currentFamily: Ref<string> = ref('All Posts'); // Use Ref<T> to define the type of the reactive variable
const filteredPosts: Ref<Post[]> = ref([]);

const getfamilies = async() =>{
  const familiesResponse = await getFamilies()
  families.value = familiesResponse;

  if (families.value) {
    const familyIdArray = families.value.map((item: Family) => item._id).flat();
    console.log(familyIdArray);
    const feedOptions = {
      skip: 0,
      limit: 50
    };
    loading.value = true
    const postsResponse = await getFeed(familyIdArray, feedOptions)
    posts.value = postsResponse.reverse() // Reverse the posts array here
    families.value = familiesResponse.concat([{ _id: "all", name: "All Posts" }]); // Move this line above the posts assignment
    loading.value = false
  }

}

function closeModal() {
  isOpen.value = false;
}
async function openModal() {
  isOpen.value = true;
}

function setFamily(fam: string, famId: string): void {
  currentFamily.value = fam;
  isOpen.value = false;
  if (famId === "all") {
    filteredPosts.value = posts.value;
  } else {
    filterPosts(famId);
  }
}


function filterPosts(famId: string) {
  filteredPosts.value = Array.from(posts.value).filter((post) => {
    return (post as { familyId: string }).familyId === famId;
  });
}







onMounted(() => {
  getPosts();
  getfamilies();
})

const { t } = useI18n()
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-center items-center mb-10">
      <hr class="font-bold">
    <button v-if="posts && posts.length > 0" @click="openModal" id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="ml-10 mb-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800  hover:to-blue-900 text-white font-bold py-2 px-4 rounded shadow-lgbg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800  hover:to-blue-900 text-white font-bold py-2 px-4 rounded shadow-lg">
      {{ currentFamily }}
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
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <DialogTitle
                    as="h3"
                    class="text-center text-2xl font-bold leading-6 text-gray-900"
                  >
                    View posts from:
                  </DialogTitle>
                  <div class="grid grid-cols-3 gap-4 mt-4">
                    

                    <button v-for="family in families" :key="family._id" @click="setFamily(family.name, family._id)" 
                      class="text-left mb-5 bg-gradient-to-r from-blue-600 to-blue-800 rounded-md hover:from-blue-800 hover:to-blue-900 text-white font-bold py-2 px-4 rounded shadow-lg">
                      {{family.name}}
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
    <h1 class="text-6xl font-bold text-black mx-auto text-shadow hover:text-shadow-lg" @click="openModal"> {{ currentFamily }}</h1>
    </div>
    <div class="border-b-4 font-bold mb-10"></div>

    <div v-if="posts && filteredPosts.length > 0" class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 ml-10 mr-10">

        <PostCard v-for="post in filteredPosts" :key="post._id" :post="post" />

    </div>
    <div v-else-if="posts && posts.length > 0" class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-2 ml-10 mr-10">

        <PostCard v-for="post in posts" :key="post._id" :post="post" />

    </div>
    <div v-else-if="loading">
      <PostLoader v-for="_, index in Array.from({ length: 10 })" :key="index" />
    </div>
    <div v-else-if="!families || families.length == 0">
      <div class="w-full h-xl flex flex-col items-center mt-4 bg-white  px-8 pt-6 pb-8 mb-4 flex justify-center">
        <div class="font-bold text-gray-800 mb-10 text-4xl">View Posts</div>
        <div class="container w-xl flex justify-center rounded-lg overflow-hidden shadow-lg  py-6 px-4 min-h-[200px]">
          <div class="">
            <h1 class="font-bold text-gray-900 mb-10 text-xl">Join a family to see posts</h1>
            <div class="w-full justify-between">
              <AddFamilyButton class="mx-3" />
              <JoinFamilyButton class="mx-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="w-full h-xl flex flex-col items-center mt-4 bg-white  px-8 pt-6 pb-8 mb-4 flex justify-center">
        <div class="font-bold text-gray-800 mb-10 text-4xl">There are no memories made in  your family! :(</div>
        <div class="container w-xl flex justify-center rounded-lg overflow-hidden shadow-lg  py-6 px-4 min-h-[200px]">
          <div class="">
            <h1 class="font-bold text-gray-900 mb-10 text-xl">There are no posts made in your family.</h1>
            <h1 class="font-bold text-gray-900 mb-10 text-xl">Make the first post.</h1>
            <div class="w-full justify-between">
              <PostButton/>
            </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.container {
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.5);
}

.text-shadow {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.text-shadow-lg {
  text-shadow: 6px 6px 10px rgba(0, 0, 0, 0.5);
}

</style>
