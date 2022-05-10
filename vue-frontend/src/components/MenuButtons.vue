<template>
    <div>
        <button class="btn btn-outline-light mr-2"
            v-b-tooltip.hover
            :title="$t('main.shutdown')"
            @click="shutdown()"
        >
            <i class="fas fa-power-off"></i>
        </button>

  <div class="locale-changer">
    <select v-model="lang">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>


    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
    name: 'locale-changer',
    data () {
      return { langs: ['en', 'nl'] }
    },
    computed: {
      lang: {
        get: function() {
          return this.$store.state.locale
        },
        set: function(newVal) {
          this.$store.dispatch('setLocale', newVal)
        }
      }
    },
    methods: {
      shutdown(){
        if (confirm(this.$i18n.t('main.shutdown_confirm'))) {
          this.busy = true
          fetch(`http://${location.hostname}:3000/api/shutdown`)
          .then(res => res.text())
          .then(data => {
             alert( this.$i18n.t('main.shutdown_success'))
          });
        }
      }
    },

}
</script>
