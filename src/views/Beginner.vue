<template>
  <div>
    <div class="row">
      <div class="col">
        <Blockly />
      </div>
    </div>
    <div class="row">
      <div class="col">
          <Xterm />
      </div>
    </div>
  </div>
</template>

<script>
import Blockly from '@/components/Blockly.vue'
import Xterm from '@/components/Xterm.vue'


export default {
  name: 'beginner',
  components: {
    Blockly,
    Xterm
  }
}
</script>
