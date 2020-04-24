<template>
  <div>
    <div class="row">
      <div class="col">
        <Blockly :linenumber="linenumber" @blocklyCode="updateBlocklyCode"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
          <Xterm :code="blocklyCode" @currentLine="updateLinenumber"/>
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
      blocklyCode: "",
      linenumber: 0
    }
  },
  methods: {
    updateBlocklyCode(e) {
      this.blocklyCode = e;
    },
    updateLinenumber(e) {
      this.linenumber = e;
    },
  },
  components: {
    Blockly,
    Codemirror,
    Xterm
  }
}
</script>
