<template>
  <textarea ref="codemirror"></textarea>
</template>


<script>
import codemirror from 'codemirror'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/lib/codemirror.css'

export default {
  data: () => ({
    editor: Object
  }),
  methods: {
  },
  mounted() {
    this.editor = codemirror.fromTextArea(this.$refs.codemirror, {
      mode: "text/html",
      lineNumbers: true,
      autoRefresh: true,
      viewportMargin: Infinity
    });
    this.editor.on('change', editor => {
      this.$store.dispatch('setHTML', editor.getValue())
    });
  },
  watch: { 
  }
}
</script>
