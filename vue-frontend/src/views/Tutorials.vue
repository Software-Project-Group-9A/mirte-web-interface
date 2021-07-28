<template>
  <div class="container">
      Oefeningen

      <div v-for="t of tutorials" v-bind:key="t.title" class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">{{t.title}}</h5>
          <p class="card-text">{{t.description}}</p>
          <a href="#" @click="go(t)" class="card-link">Ga naar deze opdracht</a>
        </div>
      </div>
  </div>
</template>

<script>

import build from '@/assets/tutorials/build.json'
import stm32 from '@/assets/tutorials/stm32.json'
import fibbonachi from '@/assets/tutorials/fibbonachi.json'

export default {
  data(){
    return {
      tutorials: [build, stm32, fibbonachi]
    }
  },
  methods: {
    go(t){
      this.$store.dispatch('setTutorial', t)
      this.$router.push('/')
    }
  }
}
</script>