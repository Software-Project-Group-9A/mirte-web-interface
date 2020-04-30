<template>
  <div>
    <div class="row">
      <div class="col-8 mr-0 pr-0">
        <Blockly />
      </div>

      <div class="col">
        <div class="row codemirror-wrapper">
          <Codemirror />
        </div>
        <div class="row">
            <Xterm />
        </div>
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
