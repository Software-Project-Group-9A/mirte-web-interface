<template>
  <div class="container">
      Oefeningen

      <div class="card mt-3">
        <div class="card-body">
          <h5 class="card-title">Fibbonachi</h5>
          <p class="card-text">Print de Fibbonachi reeks, leer het gebruik van functies</p>
          <a href="#" @click="go('@/assets/tutorials/fibbonachi.json')" class="card-link">Ga naar deze opdracht</a>
        </div>
      </div>
  </div>
</template>

<script>

import fibbonachi from '@/assets/tutorials/fibbonachi.json'

export default {
  methods: {
    go(t){
      this.$store.dispatch('setTutorial', fibbonachi)
      this.$router.push('/')
    }
  }
}
</script>