<template>
    <div>
        <button class="btn btn-outline-light mr-2"
            v-b-tooltip.hover
            title="shutdown"
            @click="shutdown()"
        >
            <i class="fas fa-power-off"></i>
        </button>

    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {

    methods: {
      shutdown(){
        if (confirm('Weet je zeker dat je wilt afsluiten?')) {
          this.busy = true
          fetch(`http://${location.hostname}:3000/api/shutdown`)
          .then(res => res.text())
          .then(data => {
            alert("Wacht nu totdat de lampjes op de computer van de robot uit is. Daarna kan je de schakelaar op de PCB uitzetten.")
          });
        }
      }
    },

}
</script>
