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

  <div class="text-center mt-2">
      <p>&copy; {{ new Date().getFullYear() }}, Keepsake. All Rights Reserved.</p>
  </div>
</footer>
</template>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px;
  background-color: #272727;
  color: #ffffff;
  box-shadow: 0px 5px 15px -5px rgba(0, 0, 0, 1);
}

</style>
