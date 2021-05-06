<template>
    <div>
        <button class="btn btn-outline-light mr-2"
            v-b-tooltip.hover
            title="shutdown"
            @click="control('shutdown')"
        >
            <i class="fas fa-power-off"></i>
        </button>

    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {

    methods: {
        control(command) {
            EventBus.$emit('control', command);
        },

        openFileWindow(){
            this.$refs.file_input.click()
        },

    },

}
</script>
