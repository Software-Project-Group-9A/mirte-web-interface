<template>
  <div>
    <div class="row">
      <div class="col">
        <Blockly @blocklyCode="updateBlocklyCode"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Codemirror :code="blocklyCode" />
      </div>
      <div class="col">
          <Xterm :code="blocklyCode" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Blockly from '@/components/Blockly.vue'
import Codemirror from '@/components/Codemirror.vue'
import Xterm from '@/components/Xterm.vue'


export default {
  name: 'beginner',
  data: function () {
    return {
      blocklyCode: ""
    }
  },
  methods: {
    updateBlocklyCode(e) {
      this.blocklyCode = e;
    },
  },
  components: {
    Blockly,
    Codemirror,
    Xterm
  }
}
</script>
