<template>
  <div>

    <div class="row">
      <div class="col-8 mr-0 pr-0">
        <Moveable
          v-if="$store.getters.getTutorial"
          class="moveable"
          style="z-index: 999"
          v-bind="moveable"
          @drag="handleDrag">
          <TutorialWindow :tutorial="$store.getters.getTutorial" />
        </Moveable>
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
import TutorialWindow from '@/components/TutorialWindow.vue'
import Codemirror from '@/components/Codemirror.vue'
import Xterm from '@/components/Xterm.vue'
import ControlButtons from '@/components/ControlButtons.vue'
import Moveable from 'vue-moveable';

export default {
  name: 'advanced',
  components: {
    Blockly,
    Codemirror,
    Xterm,
    ControlButtons,
    Moveable,
    TutorialWindow
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 0,
      resizable: false,
      throttleResize: 1,
      keepRatio: false,
      scalable: false,
      throttleScale: 0,
      rotatable: false,
      throttleRotate: 0,
      pinchable: false, // ["draggable", "resizable", "scalable", "rotatable"]
      origin: false,
    }
  }),
  methods: {
    handleDrag({ target, transform }) {
      target.style.transform = transform;
    },
  }
}
</script>
