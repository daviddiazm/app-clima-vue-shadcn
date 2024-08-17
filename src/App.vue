<script setup >
  import ButtonTheme from "./components/shared/ButtonTheme.vue";
  import AppForm from "./components/AppForm.vue";
  import useWeather from "./composable/useWeather";
  import { computed, ref } from "vue";
  import WeatherInformation from "./components/WeatherInformation.vue";
  
  const { getWeather, weatherKelvin, weatherFahrenheit, weatherCelsius, locationInfo, error } = useWeather()
  const isDrawOpen = ref(false)

  const openCloseDraw = ()=> {
    isDrawOpen.value = !isDrawOpen.value
  }
  

  
</script>

<template>
  <div class="relative ">
    <ButtonTheme />
    <main class="w-full h-screen flex flex-col gap-5 justify-center items-center ">
      <AppForm
        @get-weather="getWeather"
        @open-close-draw="openCloseDraw"
      />
      <!-- <WeatherInformation
        v-if="weather"
        :weather="weather"
      /> -->
      <WeatherInformation
        @open-close-draw="openCloseDraw"
        :isDrawOpen="isDrawOpen"
        :weatherKelvin="weatherKelvin"
        :weatherFahrenheit="weatherFahrenheit"
        :weatherCelsius="weatherCelsius"
        :locationInfo="locationInfo"
        :error="error"
      />
    </main>
  </div>
</template>