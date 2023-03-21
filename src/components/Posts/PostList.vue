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
    const postsResponse = await getFeed(familyIdArray, feedOptions)
    console.log(postsResponse)
    posts.value = postsResponse
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
    <div v-if="posts" class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
    </div>
    <div v-else>
      <p>{{ t("p.posts") }}</p>
      <PostLoader v-for="_, index in Array.from({ length: 10 })" :key="index" />
    </div>
  </div>
</template>
