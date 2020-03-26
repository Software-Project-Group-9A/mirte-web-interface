<template>

  <!-- Or manually control the data synchronization -->
  <codemirror
    class="codemirror"
    ref="cmEditor"
    :value="code"
    :options="options"
  />

</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/python/python.js'

// import base style
import 'codemirror/lib/codemirror.css'

// import more codemirror resource...

export default {
  data: () => ({
    options: {
      mode: "python",
      lineNumbers: true,
      autoRefresh: true,
      gutters: ["linetracer"]
    }
  }),
  props: {
    code: String
  },
  components: {
    codemirror
  }
}
</script>
