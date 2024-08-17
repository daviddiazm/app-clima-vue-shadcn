<script setup >
  import { ref } from 'vue';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import Button from './ui/button/Button.vue';
import { Bold, Italic, Underline } from 'lucide-vue-next'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import AppLoader from "./shared/AppLoader.vue";

const weatherParse = ref('')


const props = defineProps({
  isDrawOpen: {
    type:Boolean,
    required: true
  },
  weatherKelvin: {
    type: Number,
    required: true
  },
  weatherFahrenheit: {
    type: Number,
    required: true
  },
  weatherCelsius: {
    type: Number,
    required: true
  },
  locationInfo: {
    type: Object,
    required: true
  },
  error: {
    type: String,
    required: true
  },
})


const emit = defineEmits(['open-close-draw'])

const openCloseDrawer = () => {
  emit('open-close-draw')
}

const showCelcius = () => {
  return props.weatherCelsius+'°C'
}

const parserValue = (unit) => {
  switch (unit) {
    case 'C':
      weatherParse.value = props.weatherCelsius+'°C'
      break;
    case 'F':
      weatherParse.value = props.weatherFahrenheit+'°F'
      break;
    case 'K':
      weatherParse.value = props.weatherKelvin+'°K'
      break;
  
    default:
      weatherParse.value = props.weatherCelsius+'°C'
      break;
  }
}


</script>

<template>
  <Drawer
    :open="isDrawOpen"
  >
    <!-- <DrawerTrigger>Open</DrawerTrigger> -->
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>El clima actual es de</DrawerTitle>
          <h2 v-if="error" >{{ error }}</h2>
          <div v-else>
            <div v-if="!weatherKelvin" class="w-full flex justify-center" >
              <AppLoader />
            </div>
            <div v-else class="flex-1 text-center">
              <div class="text-7xl font-bold tracking-tighter">
                {{ weatherParse || showCelcius() }}
              </div>
              <div class="text-[0.70rem] uppercase text-muted-foreground">
                {{ locationInfo.country }}/ {{ locationInfo.city }}
              </div>
            </div>
          </div>
        <DrawerDescription></DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <div class="flex justify-evenly " >
          <Button @click="parserValue('C')" >Celcius</Button>
          <Button @click="parserValue('F')" >Fahrenheit</Button>
          <Button @click="parserValue('K')" >kelvin</Button>
        </div>
        <DrawerClose>
          <Button variant="outline" @click="openCloseDrawer" class="w-full" >
            Cerrar
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>