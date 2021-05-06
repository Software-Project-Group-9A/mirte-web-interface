
<template>
   
        <nav>
            <b-nav pills>
               
                <b-nav-item :to="'Settings'" active-class="active">Instellingen</b-nav-item>
                <b-nav-item :to="'Control'" active-class="active">Besturen</b-nav-item>
                <b-nav-item :to="'/'" active-class="active" exact>Programmeren</b-nav-item>
            <!--    <b-nav-item :to="'/'" active-class="active">Programmeren</b-nav-item> -->
          <!--      <b-nav-item :to="'Network'" active-class="active">Netwerk</b-nav-item>  -->
<!--                <b-nav-item :to="'Tutorials'" active-class="active">Oefeningen</b-nav-item>  -->
                <b-navbar-nav class="ml-auto">
                     <MenuButtons /> 
                </b-navbar-nav>
            </b-nav>
        </nav>
    
</template>

<script>
import MenuButtons from '@/components/MenuButtons.vue'

export default {
  name: 'navbar',
  components: {
    MenuButtons
  }
}
</script>
