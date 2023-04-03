<script setup lang="ts">
import { getPosts, getFamilies, getFeed } from '~/common/services/services'
import type { Post } from '~/stores/types'

const posts = ref<Post[] | null>(null)

interface Family {
  _id: string;
  name: string;
  // Add any other properties here
}

const families = ref<Family[] | null>(null);
const loading = ref<boolean>(false)


const getfamilies = async() =>{
  const familiesResponse = await getFamilies()
  families.value = familiesResponse;
  console.log(families)
  if (families.value) {
    const familyIdArray = families.value.map((item: Family) => item._id).flat();
    console.log(familyIdArray);
    const feedOptions = {
      skip: 0,
      limit: 50
    };
    loading.value = true
    const postsResponse = await getFeed(familyIdArray, feedOptions)
    console.log(postsResponse)
    posts.value = postsResponse.reverse() // Reverse the posts array here
    loading.value = false
  }
}





onMounted(() => {
  getPosts();
  getfamilies();
})

const { t } = useI18n()
</script>

<template>
  <div class="mt-4">
    <div v-if="posts && posts.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
      <PostButton />
    </div>
    <div v-else-if="loading">
      <PostLoader v-for="_, index in Array.from({ length: 10 })" :key="index" />
    </div>
    <div v-else>
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
  </div>
</template>


<style scoped>

.container {
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 0.5);
}

</style>
