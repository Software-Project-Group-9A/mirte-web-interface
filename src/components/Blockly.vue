<template>
  <div>
    <div id="blocklyArea" ref="blocklyArea" class="blocklyArea">
      <div id="blocklyDiv" ref="blocklyDiv" style="height: 480px; width: 600px;"></div>
    </div>

    <xml id="toolbox" ref="toolbox" style="display: none">
		<category name="Sensors" colour="10">
			<block type="get_distance"></block>
      <block type="get_intensity"></block>
			<block type="get_pin_value"></block>
			<block type="get_virtual_color"></block>
			<block type="get_barcode"></block>
		</category>

		<category name="Flow" colour="60" expanded="true">
			<category name="Loops" colour="60">
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

			<category name="Timing" colour="60">
				<block type="wait">
					<value name="wait">
						<block type="math_number">
							<field name="NUM">1</field>
						</block>
					</value>
				</block>

				<block type="wait_until"></block>
			</category>

			<category name="If" colour="60">
				<block type="controls_if"></block>
				<block type="controls_if">
					<mutation else="1"></mutation>
				</block>
				<block type="controls_if">
					<mutation elseif="1" else="1"></mutation>
				</block>
			</category>
			<category name="Functions" custom="PROCEDURE" colour="60">
			</category>
		</category>

		<category name="Data" colour="%{BKY_LOGIC_HUE}" expanded="true">
			<category name="Boolean" colour="%{BKY_LOGIC_HUE}">
				<block type="logic_compare"></block>
				<block type="logic_operation"></block>
				<block type="logic_negate"></block>
				<block type="logic_boolean"></block>
				<block type="logic_null"></block>
				<block type="logic_ternary"></block>
			</category>
			<category name="Parameters" colour="%{BKY_LOGIC_HUE}">

				<block type="getpressedkey"></block>
			</category>
			<category name="Math" colour="%{BKY_LOGIC_HUE}">
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
			<category name="Lists" colour="%{BKY_LOGIC_HUE}">
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
			<category name="Variables" custom="VARIABLE" colour="%{BKY_LOGIC_HUE}">
			</category>
		</category>

		<category name="Actions" colour="%{BKY_LOOPS_HUE}">
			<block type="text"></block>
			<block type="text_print"></block>
			<block type="move"></block>
      <block type="pwm"></block>
			<block type="display_text"></block>
			<block type="turn"></block>
			<block type="turnAngle"></block>
		</category>

		<sep></sep>
		<category name="Modules" expanded="true">
			<category name="Button">
			</category>
			<category name="Camera">
			</category>
			<category name="QR">
			</category>
			<category name="Motor">
			</category>
		</category>
  </xml>



  </div>
</template>

<script>
  import Blockly from 'blockly';
  import 'blockly/python';
  import * as En from 'blockly/msg/en';
  
  export default {
    data: () => ({
      workspace: Object,
      prefix: "import time\n\n",
      // prefix: "import robot\nimport time\n\nzoef = robot.createRobot()\n\n"
    }),

    props: {
      blocklyCode: String,
      linenumber: Number
    },

    methods: {
      updateBlocklycode: function (code) {
        this.$emit('blocklyCode', code)
      },

      getBlockToLineMap: function() {
        var blockMap = {}
        var offset = (this.prefix.match(/\n/g) || []).length + 1;

        var all_blocks = this.workspace.getAllBlocks();

        Blockly.Python.STATEMENT_PREFIX = "blockid: %1";
        var code = Blockly.Python.workspaceToCode(this.workspace);
        let codeLines = code.split("\n");
        for (var i = 0; i < codeLines.length; i++) {
            let line = codeLines[i].trim();
            let blockidstr = line.lastIndexOf("blockid: ");
            if (blockidstr >= 0){
              line = line.substr(blockidstr);
              let block_id = line.substr(10,20);
              blockMap[i+offset] = block_id;
            }
        }

        Blockly.Python.STATEMENT_PREFIX = "";
        return blockMap;
      }
    },

    watch: {
      linenumber: function(newVal, oldVal){
        let blockMap = this.getBlockToLineMap();
        this.workspace.highlightBlock(blockMap[newVal]);
      }
    },

    mounted: function() {
      Blockly.setLocale(En);

      var blocklyArea = this.$refs.blocklyArea;
      var blocklyDiv = this.$refs.blocklyDiv;
      this.workspace = Blockly.inject(blocklyDiv,
          {toolbox: this.$refs.toolbox});
      var onresize = (e) => {
        // Compute the absolute coordinates and dimensions of blocklyArea.
        var element = blocklyArea;
        var x = 0;
        var y = 0;
        do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
        } while (element);
        // Position blocklyDiv over blocklyArea.
        blocklyDiv.style.left = x + 'px';
        blocklyDiv.style.top = y + 'px';
        blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
        blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        Blockly.svgResize(this.workspace);
      };
      window.addEventListener('resize', onresize, false);
      onresize();
      Blockly.svgResize(this.workspace);

      this.workspace.toolbox_.flyout_.autoClose = false

      // Load the interpreter now, and upon future changes.
      //generateCodeAndLoadIntoInterpreter();
      this.workspace.addChangeListener((event) => {
          //console.log(event);
          if (event instanceof Blockly.Events.Move || event instanceof Blockly.Events.Delete || event instanceof Blockly.Events.Change) {
          // Something changed. Parser needs to be reloaded.

          var code = Blockly.Python.workspaceToCode(this.workspace);

          code = this.prefix + code;
          // cmEditor.setValue(code);
          this.updateBlocklycode(code)
          

          var xml = Blockly.Xml.workspaceToDom(this.workspace);
          var xml_text = Blockly.Xml.domToText(xml);
          localStorage.setItem("blockly", xml_text);

        }
      });

      // Blockly block definition
      Blockly.Blocks['move'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Move ")
              .appendField(new Blockly.FieldDropdown([
                ['forward', 'forward'],
                ['backward', 'backward']
              ]), 'direction')
              .appendField("with speed")
              .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly block definition
      Blockly.Blocks['move'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Move ")
              .appendField(new Blockly.FieldDropdown([
                ['forward', 'forward'],
                ['backward', 'backward']
              ]), 'direction')
              .appendField("with speed")
              .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['move'] = function(block) {
        let direction = block.getFieldValue('direction');
        let speed = block.getFieldValue('speed');
        let code = `zoef.move('${direction}', ${speed})\n`;
        return code;
      };

      // Blockly block definition
      Blockly.Blocks['turn'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Turn ")
              .appendField(new Blockly.FieldDropdown([
                ['left', 'left'],
                ['right', 'right']
              ]), 'direction')
              .appendField("speed")
              .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['turn'] = function(block) {
        let direction = block.getFieldValue('direction');
        let speed = block.getFieldValue('speed');
        let code = 'zoef.turn(\'' + direction + '\', ' + speed + ')\n';
        return code;
      };


      // Blockly block definition
      Blockly.Blocks['display_text'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Display text")
              .appendField(new Blockly.FieldTextInput("Hello, World!"), "text");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['display_text'] = function(block) {
        let text = block.getFieldValue('text');
        let code = `zoef.displayText("${text}")\n`;
        return code;
      };

      // Blockly generator
      Blockly.Blocks['get_pin_value'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("get analog pin value")
              .appendField(new Blockly.FieldNumber(1), "pin");
          this.setOutput(true, null);
          this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_pin_value'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        let pin = block.getFieldValue('pin');
        let code = `zoef.getPinValue(${pin})`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_virtual_color'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("get a color from the camera ")
              .appendField(new Blockly.FieldDropdown([
                ['left', 'left'],
                ['right', 'right']
              ]), 'direction')
          this.setOutput(true, null);
          this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_virtual_color'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        let direction = block.getFieldValue('direction');
        let code = `zoef.getVirtualColor('${direction}')`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_barcode'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("get a barcode or qr code from the camera ")
          this.setOutput(true, null);
          this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_barcode'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        let code = `zoef.getBarcode()`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly block definition
      Blockly.Blocks['turnAngle'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("Turn with angle ")
              .appendField(new Blockly.FieldAngle(90), "angle");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['turnAngle'] = function(block) {
        let angle_angle = block.getFieldValue('angle');
        let code = 'zoef.turnAngle(' + angle_angle + ')\n';
        return code;
      };


      // Blockly block definition
      Blockly.Blocks['wait'] = {
        init: function() {
          this.appendValueInput("wait")
              .setCheck("Number")
              .appendField("Wait ");
          this.appendDummyInput()
              .appendField("second(s)");
          this.setInputsInline(true);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['wait'] = function(block) {
        let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
        let code = 'time.sleep(' + value_wait + ')\n';
        return code;
      };


      // Blockly generator
      Blockly.Blocks['get_intensity'] = {

        init: function() {
          this.appendDummyInput()
            .appendField("get intensity of ")
            .appendField(new Blockly.FieldDropdown([['left', 'left'], ['right', 'right']]), 'sensor');
          this.setOutput(true, null);
          this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl(""); 
        }
      };

      Blockly.Python['get_intensity'] = function(block) {
        let sensor = block.getFieldValue('sensor');
        let code = `zoef.getIntensity('${sensor}')`;
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_distance'] = {

        init: function() {
          this.appendDummyInput()
            .appendField("get distance of ")
            .appendField(new Blockly.FieldDropdown([['left', 'left'], ['right', 'right']]), 'sensor');
          this.setOutput(true, null);
          this.setColour(160);
      this.setTooltip("");
      this.setHelpUrl("");	
        }
      };

      Blockly.Python['get_distance'] = function(block) {
        let sensor = block.getFieldValue('sensor');
        let code = `zoef.getDistance('${sensor}')`;
        return [code, Blockly.Python.ORDER_NONE];
      };

      Blockly.Blocks['wait_until'] = {
        init: function() {
          this.appendValueInput("condition")
              .setCheck("Boolean")
              .appendField("Wait until");
          this.setInputsInline(false);
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };


      // Blockly generator
      Blockly.Python['wait_until'] = function(block) {
        let value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
        let code = "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
        // TODO: make sleep depend on frequency of topic
        return code;
      };

      // Blockly block definition
      Blockly.Blocks['pwm'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("Set PWM of  ")
            .appendField(new Blockly.FieldDropdown([['left', 'left'], ['right', 'right']]), 'motor')
            .appendField("to value")
            .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour(130);
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['pwm'] = function(block) {
        let motor = block.getFieldValue('motor');
        let speed = block.getFieldValue('speed');
        let code = `zoef.setMotorPWM('${motor}', ${speed})\n`;
        return code;
      };


      // Load xml from previous session
      var storage = localStorage.getItem("blockly");
      if (storage !== null) {
          var xml = Blockly.Xml.textToDom(storage);
          Blockly.Xml.domToWorkspace(xml, this.workspace);
      }

      var latestCode = '';
    }
    

  }
</script>
