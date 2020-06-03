
<template>
    <header class="m-2">
        <nav>
            <b-nav pills>
                <b-nav-item :to="'/'" active-class="active" exact>Programmeren</b-nav-item>
                <b-nav-item :to="'Sensors'" active-class="active">Sensoren</b-nav-item>
                <b-nav-item :to="'Settings'" active-class="active">Instellingen</b-nav-item>
                <b-nav-item :to="'Network'" active-class="active">Netwerk</b-nav-item>
                <b-nav-item :to="'Tutorials'" active-class="active">Oefeningen</b-nav-item>
                <b-navbar-nav class="ml-auto">
                    <ControlButtons />
                </b-navbar-nav>
            </b-nav>
        </nav>
    </header>
</template>

<script>
import ControlButtons from '@/components/ControlButtons.vue'

export default {
  name: 'navbar',
  components: {
    ControlButtons
  }
}
</script>
