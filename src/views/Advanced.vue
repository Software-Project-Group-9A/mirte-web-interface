<template>
  <div>
    <ControlButtons />
    <div class="row">
      <div class="col">
        <Blockly />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Codemirror />
      </div>
      <div class="col">
          <Xterm />
      </div>
    </div>
  </div>
</template>

<script>
import Blockly from '@/components/Blockly.vue'
import Codemirror from '@/components/Codemirror.vue'
import Xterm from '@/components/Xterm.vue'
import ControlButtons from '@/components/ControlButtons.vue'

export default {
  name: 'advanced',
  components: {
    Blockly,
    Codemirror,
    Xterm,
    ControlButtons
  }
}
</script>
