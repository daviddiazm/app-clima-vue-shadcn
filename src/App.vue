<script setup >
  import ButtonTheme from "./components/shared/ButtonTheme.vue";
  import AppForm from "./components/AppForm.vue";
  import useWeather from "./composable/useWeather";
  const { getWeather } = useWeather()



</script>

<template>
  <div class="relative ">
    <ButtonTheme />
    <main class="w-full h-screen flex justify-center items-center ">
      <AppForm
        @get-weather="getWeather"
      />
    </main>
  </div>
</template>