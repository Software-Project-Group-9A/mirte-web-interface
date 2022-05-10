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
      gutters: ["linetracer"],
      viewportMargin: Infinity
    });
    this.editor.on('change', editor => {
      this.$store.dispatch('setCode', editor.getValue())
    });
    this.editor.save()
    this.editor.setValue(this.$store.getters.getCode)
  },
  watch: { 
    '$store.getters.getCode': function(newVal, oldVal) {
       if (newVal != this.editor.getDoc().getValue()){
          this.editor.setValue(newVal)
       }
    },
    '$store.getters.getLinenumber': function(newVal, oldVal){
      this.editor.clearGutter("linetracer");
      this.editor.setGutterMarker(newVal-1, "linetracer", this.makeMarker());
    }
  }
}
</script>
