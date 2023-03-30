<script setup lang="ts">
import { format } from 'date-fns'
import type { Post } from '~/stores/types'

const props = defineProps<{
  post: Post
}>()
const emptyProfilePic = 'https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png'
const post = props.post

const { t } = useI18n()
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
          {{ format(new Date(post?.date?.toString() || new Date()), 'dd MMMM yyyy hh:mm') }}
        </p>
        <AudioPlayer :src="post.audioUrl" />
      </div>
    </div>
  </div>
</template>

<style>

</style>
