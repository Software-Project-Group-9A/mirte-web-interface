
<template>
    <header class="m-2">
        <nav>
            <b-nav pills>
                <b-nav-item :to="'/'" active-class="active" exact>Control panel</b-nav-item>
                <b-nav-item :to="'Sensors'" active-class="active">Sensors</b-nav-item>
                <b-nav-item :to="'Settings'" active-class="active">Settings</b-nav-item>
                <b-nav-item :to="'Network'" active-class="active">Network</b-nav-item>
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
