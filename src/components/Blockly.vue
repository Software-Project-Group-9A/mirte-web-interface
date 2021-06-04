<template>
  <div>

    <div id="blocklyArea" ref="blocklyArea" class="blocklyArea">
      <div id="blocklyDiv" ref="blocklyDiv" style="height: 480px; width: 600px"></div>
    </div>

    <xml id="toolbox" ref="toolbox" style="display: none">

      <category name="Flow" colour="%{BKY_FLOW_RGB}" expanded="true">

        <category name="Lussen" colour="%{BKY_FLOW_RGB}">
          <block type="controls_repeat_ext">
            <value name="TIMES">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
          </block>
          <block type="controls_whileUntil"></block>
          <block type="controls_for">
            <field name="VAR">i</field>
            <value name="FROM">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
            <value name="TO">
              <block type="math_number">
                <field name="NUM">10</field>
              </block>
            </value>
            <value name="BY">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
          <block type="controls_forEach"></block>
          <block type="controls_flow_statements"></block>
        </category>

        <category name="Tijd" colour="%{BKY_FLOW_RGB}">
          <block type="wait">
            <value name="wait">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
          </block>
          <block type="wait_until"></block>
          <block type="get_timestamp"></block>
        </category>

        <category name="Als/Dan" colour="%{BKY_FLOW_RGB}">
          <block type="controls_if"></block>
          <block type="controls_if">
            <mutation else="1"></mutation>
          </block>
          <block type="controls_if">
            <mutation elseif="1" else="1"></mutation>
          </block>
        </category>

        <category name="Functies" custom="PROCEDURE" colour="%{BKY_FLOW_RGB}">
        </category>

      </category>

      <category name="Data" colour="%{BKY_DATA_RGB}" expanded="true">

        <category name="Logica" colour="%{BKY_DATA_RGB}">
          <block type="logic_compare"></block>
          <block type="logic_operation"></block>
          <block type="logic_negate"></block>
          <block type="logic_boolean"></block>
          <block type="logic_null"></block>
          <block type="logic_ternary"></block>
        </category>

        <category name="Rekenen" colour="%{BKY_DATA_RGB}">
          <block type="math_number">
            <field name="NUM">123</field>
          </block>
          <block type="math_arithmetic"></block>
          <block type="math_single"></block>
          <block type="math_trig"></block>
          <block type="math_constant"></block>
          <block type="math_number_property"></block>
          <block type="math_round"></block>
          <block type="math_on_list"></block>
          <block type="math_modulo"></block>
          <block type="math_constrain">
            <value name="LOW">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
            <value name="HIGH">
              <block type="math_number">
                <field name="NUM">100</field>
              </block>
            </value>
          </block>
          <block type="math_random_int">
            <value name="FROM">
              <block type="math_number">
                <field name="NUM">1</field>
              </block>
            </value>
            <value name="TO">
              <block type="math_number">
                <field name="NUM">100</field>
              </block>
            </value>
          </block>
          <block type="math_random_float"></block>
          <block type="math_atan2"></block>
        </category>

        <category name="Lijsten" colour="%{BKY_DATA_RGB}">
          <block type="lists_create_empty"></block>
          <block type="lists_create_with"></block>
          <block type="lists_repeat">
            <value name="NUM">
              <block type="math_number">
                <field name="NUM">5</field>
              </block>
            </value>
          </block>
          <block type="lists_length"></block>
          <block type="lists_isEmpty"></block>
          <block type="lists_indexOf"></block>
          <block type="lists_getIndex"></block>
          <block type="lists_setIndex"></block>
        </category>

        <category name="Variabelen" custom="VARIABLE" colour="%{BKY_DATA_RGB}">
        </category>

      </category>

      <category name="Peripherals" colour="%{BKY_SENSORS_RGB}">
        <category v-for="item in Object.keys(blocks)" v-bind:name="item" :key="item"
                  colour="%{BKY_SENSORS_RGB}">
          <block v-for="func in blocks[item].functions" :type="func"></block>
        </category>
      </category>

<!--      <category name="Acties" colour="%{BKY_ACTIONS_RGB}">-->
<!--      </category>-->

    </xml>

  </div>
</template>

<script>
import Blockly from 'blockly'
import 'blockly/python'
import EventBus from '../event-bus'
import * as NL from 'blockly/msg/nl'
import properties_ph from "../assets/json/properties_ph.json"

// // Palette generated by: https://coolors.co/5a7574-cfd186-e3655b-52414c-5b8c5a-57467b
Blockly.Msg.SENSORS_RGB = "#cfd186"
Blockly.Msg.FLOW_RGB = "#e3655b"
Blockly.Msg.DATA_RGB = "#52414c"
Blockly.Msg.ACTIONS_RGB = "#57467b"
Blockly.Msg.MODULES_RGB = "#5b8c5a"

export default {
  data: () => ({
    blocks: properties_ph,
    PConfig: [],
    workspace: Object,
    prefix: ""
  }),

  methods: {
    // highlightBlockLine and getBlockToLineMap are methods which are used in marking
    // the blocks where the execution is currently at (the line number of it).
    getBlockToLineMap: function () {
      const blockMap = {}
      const offset = (this.prefix.match(/\n/g) || []).length + 1
      Blockly.Python.STATEMENT_PREFIX = "blockID: %1"
      const code = Blockly.Python.workspaceToCode(this.workspace)
      let codeLines = code.split("\n")
      for (let i = 0; i < codeLines.length; i++) {
        let line = codeLines[i].trim()
        let blockIdStr = line.lastIndexOf("blockID: ")
        if (blockIdStr >= 0) {
          line = line.substr(blockIdStr)
          blockMap[i + offset] = line.substr(10, 20)
        }
      }
      Blockly.Python.STATEMENT_PREFIX = ""
      return blockMap
    },
    highlightBlockLine: function (blockId, isParent) {
      if (isParent) {
        this.workspace.highlightBlock(blockId)
      } else {
        this.workspace.highlightBlock(blockId, true)
      }
      let curBlock = this.workspace.getBlockById(blockId)
      if (curBlock) {
        let children = curBlock.getChildren()
        let blockMap = this.getBlockToLineMap() // TODO: this should only be generated when the block change. Not while running.
        for (let child = 0; child < children.length; child++) {
          if (Object.values(blockMap).indexOf(children[child].id) === -1) {
            this.highlightBlockLine(children[child].id, false)
          }
        }
      }
    },
    ReloadLocalWorkspace: function () {
      const storage = localStorage.getItem("blockly")
      if (storage !== null) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(storage), this.workspace)
      }
    },
    // recolor: function (block, rgb_color) {
    //   //https://groups.google.com/forum/#!topic/blockly/yUBEymLKBbk
    //   const oldInit = block.init
    //   block.init = function () {
    //     oldInit.call(this)
    //     this.setColour(rgb_color)
    //   }
    // }
  },

  watch: {
    '$store.getters.getLinenumber': function (newVal, oldVal) {
      let blockMap = this.getBlockToLineMap() // TODO: this should only be generated when the block change. Not while running.
      this.highlightBlockLine(blockMap[newVal], true)
    },
    '$store.getters.getBlockly': function (newVal, oldVal) {
      console.log("newVal")
      const xml = Blockly.Xml.textToDom(newVal);
      this.workspace.clear()
      Blockly.Xml.domToWorkspace(xml, this.workspace)
      localStorage.setItem("blockly", newVal)
    },
    '$store.getters.getPConfig': function (newVal, oldVal) {
      console.log("QUACK")
    }
  },
  mounted() {

    // Blockly configuration
    Blockly.setLocale(NL)

    // Load configured blockly modules
    for (let PBM of Object.keys(this.blocks)) {
      import(`../assets/json/${PBM}.js`)
          .then(blk => blk.load(Blockly))
          .catch(err => console.log(err))
    }

    // workspace initialization
    const blocklyArea = this.$refs.blocklyArea
    const blocklyDiv = this.$refs.blocklyDiv
    this.workspace = Blockly.inject(blocklyDiv, {
      toolbox: this.$refs.toolbox,
      media: 'blockly-media/',
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.8,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      renderer: 'zelos'
    })

    // workspace configuration
    this.workspace.toolbox_.flyout_.autoClose = false

    // Window resize listener
    const onresize = (e) => {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      let element = blocklyArea
      let x = 0
      let y = 0
      // Sums over all the elements' parents offsets
      do {
        x += element.offsetLeft
        y += element.offsetTop
        element = element.offsetParent
      } while (element)
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px'
      blocklyDiv.style.top = y + 'px'
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px'
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px'
      Blockly.svgResize(this.workspace)
    }
    window.addEventListener('resize', onresize, false)
    onresize()

    // Python Console
    this.workspace.addChangeListener((event) => {

      if (event instanceof Blockly.Events.Move || event instanceof Blockly.Events.Delete || event instanceof Blockly.Events.Change) {
        // Something changed. Parser needs to be reloaded.

        let code = Blockly.Python.workspaceToCode(this.workspace)

        code = this.prefix + code
        // cmEditor.setValue(code)

        const xml = Blockly.Xml.workspaceToDom(this.workspace)
        const xml_text = Blockly.Xml.domToText(xml)
        localStorage.setItem("blockly", xml_text)

        // update the store
        this.$store.dispatch('setCode', code)
        // this.$store.dispatch('setBlockly', xml_text)
      }
    })

    // Undo/Redo
    EventBus.$on('control', (payload) => {
      switch (payload) {
        case "undo":
          this.workspace.undo(false)
          break
        case "redo":
          this.workspace.undo(true)
          break
      }
    })

    ////////////////////////////////////////////////////////////////////////////////////////
    //                                 Block definitions                                  //
    ////////////////////////////////////////////////////////////////////////////////////////

    Blockly.Blocks['set_analog_pin_value'] = {
      init: function () {
        this.appendValueInput("value")
            .setCheck(['Number'])
            .appendField("zet waarde van analoge pin ")
            .appendField(new Blockly.FieldTextInput("A0"), "pin")
            .appendField("op")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['set_analog_pin_value'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
      return `zoef.setAnalogPinValue('${pin}', ${value})\n`;
    };

    Blockly.Blocks['get_pin_value'] = {
      init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['analoge', 'analog'], ['digitale', 'digital']]), 'type')
            .appendField("waarde van pin")
            .appendField(new Blockly.FieldNumber(1), "pin");
        this.setOutput(true, null);
        this.setColour("%{BKY_SENSORS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['get_pin_value'] = function (block) {
      // TODO: Assemble JavaScript into code letiable.
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let type = block.getFieldValue('type');
      let code = "";
      if (type === "analog") {
        code = `zoef.getAnalogPinValue(${pin})`;
      } else {
        code = `zoef.getDigitalPinValue(${pin})`;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };

    Blockly.Blocks['wait'] = {
      init: function () {
        this.appendValueInput("wait")
            .setCheck("Number")
            .appendField("wacht ");
        this.appendDummyInput()
            .appendField("seconden");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_FLOW_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['wait'] = function (block) {
      Blockly.Python.definitions_['import_time'] = 'import time';
      let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
      return 'time.sleep(' + value_wait + ')\n';
    };

    Blockly.Blocks['wait_until'] = {
      init: function () {
        this.appendValueInput("condition")
            .setCheck("Boolean")
            .appendField("wacht totdat");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_FLOW_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['wait_until'] = function (block) {
      Blockly.Python.definitions_['import_time'] = 'import time';
      let value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
      // TODO: make sleep depend on frequency of topic
      return "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
    };

    Blockly.Blocks['get_timestamp'] = {
      init: function () {
        this.appendDummyInput()
            .appendField("tijd sinds")
            .appendField(new Blockly.FieldDropdown([['begin', 'start'], ['laatste aanroep', 'call']]), 'version');
        this.setOutput(true, null);
        this.setColour("%{BKY_FLOW_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['get_timestamp'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let version = block.getFieldValue('version');
      let code = `zoef.getTimestamp()`;
      if (version.localeCompare("start") !== 0) {
        code = `zoef.getTimeSinceLastCall()`;
      }
      return [code, Blockly.Python.ORDER_NONE];
    };

    //Reload stored workspace, will not work with PBM currently
    //this.ReloadLocalWorkspace();

    // Set block colors
    // for (let blockId in predefined_blocks.flow) {
    //   this.recolor(Blockly.Blocks[blockId], "%{BKY_FLOW_RGB}");
    // }
    // for (let blockId in predefined_blocks.data) {
    //   this.recolor(Blockly.Blocks[blockId], "%{BKY_DATA_RGB}");
    // }
    // for (let blockId in predefined_blocks.actions) {
    //   this.recolor(Blockly.Blocks[blockId], "%{BKY_ACTIONS_RGB}");
    // }
    // for (let blockId in predefined_blocks.sensors) {
    //   this.recolor(Blockly.Blocks[blockId], "%{BKY_SENSORS_RGB}");
    // }
  }
}

// const predefined_blocks = {
//   "flow" : [
//     'controls_repeat_ext',
//     'controls_whileUntil',
//     'controls_for',
//     'controls_forEach',
//     'controls_flow_statements',
//     'controls_if',
//     'procedures_defnoreturn',
//     'procedures_defreturn',
//     'procedures_ifreturn'
//   ],
//   "data" : [
//     'variables_set',
//     'variables_get',
//     'math_change',
//     'logic_compare',
//     'logic_operation',
//     'logic_negate',
//     'logic_boolean',
//     'logic_null',
//     'logic_ternary',
//     'math_number',
//     'math_arithmetic',
//     'math_single',
//     'math_trig',
//     'math_constant',
//     'math_number_property',
//     'math_round',
//     'math_on_list',
//     'math_modulo',
//     'math_constrain',
//     'math_random_int',
//     'math_random_float',
//     'math_atan2',
//     'lists_create_empty',
//     'lists_create_with',
//     'lists_repeat',
//     'lists_length',
//     'lists_isEmpty',
//     'lists_indexOf',
//     'lists_getIndex',
//     'lists_setIndex'
//   ],
//   "actions" : ['text', 'text_print'],
//   "sensors" : [],
// }
</script>
