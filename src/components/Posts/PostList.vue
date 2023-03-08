<template>
  <div class="mt-4">
    <div v-if="posts" class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1">
      <PostCard v-for="post in posts" :key="post._id" :post="post" />
      <div ref="sentinel"></div>
    </div>
    <div v-else>
      <p>{{ t("p.posts") }}</p>
      <PostLoader v-for="_, index in Array.from({ length: 3 })" :key="index" />
    </div>
  </div>
  <h1 ref="loadingMore">Loading more..</h1>
</template>

<script setup lang="ts">
import { getFamilies, getFeed } from '~/common/services/services'
import type { Post } from '~/stores/types'

const posts = ref<Post[] | null>(null)

interface Family {
  _id: string;
  name: string;
  // Add any other properties here
}

const families = ref<Family[] | null>(null);

const getPosts = async (familyIds: string[], feedOptions: any) => {
  const response = await getFeed(familyIds, feedOptions);
  return response;
};

const getFamiliesWithPosts = async (familyIds: string[], feedOptions: any) => {
  const familiesResponse = await getFamilies();
  families.value = familiesResponse;
  if (families.value) {
    const familyIdArray = families.value.map((item: Family) => item._id).flat();
    console.log(familyIdArray);
    const postsResponse = await getPosts(familyIdArray, feedOptions);
    console.log(postsResponse);
    posts.value = postsResponse;
  }
};

const feedOptions = ref({
  skip: 0,
  limit: 3,
});

const intersectionObserverOptions = ref({
  rootMargin: '0px',
  threshold: 1.0,
});

const sentinelRef = ref<HTMLDivElement | null>(null);
const loadingMoreRef = ref<HTMLHeadingElement | null>(null);

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.target === loadingMoreRef.value) {
      console.log('Load more posts');
      feedOptions.value.skip += feedOptions.value.limit;
    }
  });
};

const observer = ref(
  new IntersectionObserver(handleIntersection, intersectionObserverOptions.value)
);

onMounted(() => {
  getFamiliesWithPosts([], feedOptions.value);
});

onUpdated(() => {
  observer.value.observe(sentinelRef.value!);
  if (loadingMoreRef.value) {
    observer.value.observe(loadingMoreRef.value);
  }
});

onUnmounted(() => {
  observer.value.disconnect();
});

const { t } = useI18n();
</script>
