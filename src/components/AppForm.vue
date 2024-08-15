<script setup>
import { reactive, ref } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select' 
import Input from './ui/input/Input.vue';
import Button from './ui/button/Button.vue';
import { Terminal } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'


const error = ref('')
const countries = [
  {name: 'Colombia',   code:'CO'},
  {name: 'Mexico',     code:'MX'},
  {name: 'Argentina',  code:'AR'},
  {name: 'Costa Rica', code:'CR'},
]
const locationSelect = reactive({
  city:'',
  country: ''
})

const emits = defineEmits(['get-weather'])


const validation = () => {
  if(Object.values(locationSelect).includes('')) {
    alertUse('Se tienen que llenar todos los campos')
    return
  }

  emits('get-weather',locationSelect)
}

const alertUse = (msg) => {
  error.value = msg
  setTimeout(() => {
    error.value = ''
  }, 3000);
}

</script>

<template>

  <form @submit.prevent="validation" class="w-1/2 flex flex-col gap-3 justify-around  ">

  <Alert v-if="error" >
    <Terminal class="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      {{ error }}
    </AlertDescription>
  </Alert>


    <Select
      v-model="locationSelect.country"
    >
      <SelectTrigger class="w-full">
        <SelectValue placeholder="Selecciona un pais" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Paises</SelectLabel>
          <SelectItem 
            v-for="country in countries"
            :value="country.code">
            {{ country.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Input 
      v-model="locationSelect.city"
      type="text" 
      placeholder="Escriba la ciudad"/>

    <Button type="submit"  >
      Buscar
    </Button>
  </form>
</template>
