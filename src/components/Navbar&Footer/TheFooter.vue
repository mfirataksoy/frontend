<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

/* const toggleLocales = () => {
  // change to some real logic
  console.log('🚀 ~ file: TheFooter.vue:3 ~ availableLocales', availableLocales)
  console.log('🚀 ~ file: TheFooter.vue:3 ~ localee', locale.value)

  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
} */
const changeLang = (event: Event) => {
  // console.log(event.target.value)
  locale.value = event.target.value
}
</script>

<template>
  <footer class="footer">
  <nav text-xl mt-6 flex justify-center items-center gap-2>
    <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
      <div i-carbon-campsite />
    </RouterLink>

    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <!--    <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-carbon-language />
    </a> -->
    <div class=" gap-1 inline-block">
      <!--  <label for="location" class="block text-sm font-medium text-gray-700 flex gap-1 items-center">
        <div i-carbon-language /> {{ t('footer.language') }}
      </label> -->
      <select
        id="location" name="location"
        class="mt-1 block  rounded-md bg-gray-100 border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        @change="changeLang"
      >
        <option :selected="locale.value">
          {{ locale.toUpperCase() }}
        </option>
        <option v-for="locale in availableLocales" :key="locale" :value="locale">
          {{ locale.toUpperCase() }}
        </option>
      </select>
    </div>


  </nav>
</footer>
</template>

<style scoped>
.footer {
  /* Set the footer to be fixed at the bottom of the viewport */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  /* Use flexbox to vertically center the content */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Add some padding to give space between the content and the bottom of the viewport */
  padding: 16px;
  
  /* Set the background color and text color */
  background-color: #f5f5f5;
  color: #333;
}
</style>
