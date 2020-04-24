<template>
  <textarea ref="codemirror"></textarea>
</template>

<script>
import codemirror from 'codemirror'
import 'codemirror/mode/python/python.js'
import 'codemirror/lib/codemirror.css'

export default {
  data: () => ({
    editor: Object
  }),
  props: {
    code: String,
    linenumber: Number
  },
  methods: {
    makeMarker: () => {
      var marker = document.createElement("div");
      marker.style.color = "#822";
      marker.innerHTML = "●";
      return marker;
    }
  },
  mounted() {
    this.editor = codemirror.fromTextArea(this.$refs.codemirror, {
      mode: "python",
      lineNumbers: true,
      autoRefresh: true,
      gutters: ["linetracer"]
    });
    this.editor.save()
  },
  watch: { 
    code: function(newVal, oldVal) {
      this.editor.setValue(newVal)
    },
    linenumber: function(newVal, oldVal){
      this.editor.clearGutter("linetracer");
      this.editor.setGutterMarker(newVal-1, "linetracer", this.makeMarker());
    }
  }
}
</script>
