
<template>
   
        <nav>
            <b-nav pills>
               
                <b-nav-item :to="'Settings'" active-class="active">{{ $t('main.settings') }}</b-nav-item>
                <b-nav-item :to="'Control'" active-class="active">{{ $t('main.control') }}</b-nav-item>
                <b-nav-item :to="'/'" active-class="active" exact>{{ $t('main.programming') }}</b-nav-item>
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
