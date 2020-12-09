<template>
  <div>
    <div id="blocklyArea" ref="blocklyArea" class="blocklyArea">
      <div id="blocklyDiv" ref="blocklyDiv" style="height: 480px; width: 600px;"></div>
    </div>

    <xml id="toolbox" ref="toolbox" style="display: none">
		<category name="Sensoren" colour="%{BKY_SENSORS_RGB}">
			<block type="get_distance"></block>
                        <block type="get_intensity"></block>
                        <block type="get_encoder"></block>
<!--			<block type="get_pin_value"></block> -->
                        <block type="get_keypad"></block>
<!--			<block type="get_virtual_color"></block>
			<block type="get_barcode"></block> -->
		</category>

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

		<category name="Acties" colour="%{BKY_ACTIONS_RGB}">
			<block type="text_print">
            <value name="TEXT">
               <block type="text"></block>
            </value>
         </block>
			<!--<block type="move"></block>-->
<!--         <block type="set_digital_pin_value"></block>  -->
         <block type="set_led_value">
                                        <value name="value">
                                                <block type="math_number">
                                                        <field name="NUM">0</field>
                                                </block>
                                        </value>

         </block>
         <block type="set_motor_speed">
					<value name="speed">
						<block type="math_number">
							<field name="NUM">0</field>
						</block>
					</value>
         </block>
         <block type="set_servo_angle">
                                        <value name="angle">
                                                <block type="math_number">
                                                        <field name="NUM">0</field>
                                                </block>
                                        </value>
         </block>
         

			<!--<block type="display_text"></block>
			<block type="turn"></block>
			<block type="turnAngle"></block>-->
		</category>
<!--
		<sep></sep>
		<category name="Modules" expanded="true" colour="%{BKY_MODULES_RGB}">
			<category name="Button" colour="%{BKY_MODULES_RGB}">
			</category>
			<category name="Camera" colour="%{BKY_MODULES_RGB}">
			</category>
			<category name="QR" colour="%{BKY_MODULES_RGB}">
			</category>
			<category name="Motor" colour="%{BKY_MODULES_RGB}">
			</category>
		</category>
-->
  </xml>



  </div>
</template>

<script>
  import Blockly from 'blockly';
  import 'blockly/python';
  import * as En from 'blockly/msg/en';
  import * as Nl from 'blockly/msg/nl';
  
  export default {
    data: () => ({
      workspace: Object,
      prefix: ""
    }),

    methods: {

      getBlockToLineMap: function() {
        var blockMap = {}
        var offset = (this.prefix.match(/\n/g) || []).length + 1;

        var all_blocks = this.workspace.getAllBlocks();

        Blockly.Python.STATEMENT_PREFIX = "blockid: %1";
        var code = Blockly.Python.workspaceToCode(this.workspace);
        let codeLines = code.split("\n");
        for (var i = 0; i < codeLines.length; i++) {
            let line = codeLines[i].trim();
            //console.log(line);
            let blockidstr = line.lastIndexOf("blockid: ");
            if (blockidstr >= 0){
              line = line.substr(blockidstr);
              let block_id = line.substr(10,20);
              blockMap[i+offset] = block_id;
            }
        }

        Blockly.Python.STATEMENT_PREFIX = "";
        return blockMap;
      },
      highlightBlockLine: function(blockId, isParent){ 
        if (isParent){
           this.workspace.highlightBlock(blockId);
        } else {
           this.workspace.highlightBlock(blockId, true);
        }

        let curBlock = this.workspace.getBlockById(blockId);
        if (curBlock){
           let children = curBlock.getChildren();
           let blockMap = this.getBlockToLineMap(); // TODO: this should only be generated when the block change. Not while running.
           for (var child = 0; child < children.length; child++){
              if (Object.values(blockMap).indexOf(children[child].id) == -1) {
                 this.highlightBlockLine(children[child].id, false);
              }
           }
         }
      },
      recolor: function(block, rgb_color){ 
        //https://groups.google.com/forum/#!topic/blockly/yUBEymLKBbk
        var oldInit = block.init; 
        block.init = function() { 
         oldInit.call(this); 
         this.setColour(rgb_color); 
        } 
      },
    },

    watch: {
      '$store.getters.getLinenumber': function(newVal, oldVal){
        let blockMap = this.getBlockToLineMap(); // TODO: this should only be generated when the block change. Not while running.
        this.highlightBlockLine(blockMap[newVal], true);
      },
      '$store.getters.getBlockly': function(newVal, oldVal){
        var xml = Blockly.Xml.textToDom(newVal);
        this.workspace.clear();
        Blockly.Xml.domToWorkspace(xml, this.workspace);
        localStorage.setItem("blockly", newVal);
      },
    },

    mounted: function() {
      Blockly.setLocale(Nl);

      // Palette generated by: https://coolors.co/5a7574-cfd186-e3655b-52414c-5b8c5a-57467b
      Blockly.Msg.SENSORS_RGB = "#cfd186";
      Blockly.Msg.FLOW_RGB = "#e3655b";
      Blockly.Msg.DATA_RGB = "#52414c";
      Blockly.Msg.ACTIONS_RGB = "#57467b";
      Blockly.Msg.MODULES_RGB = "#5b8c5a";


      var blocklyArea = this.$refs.blocklyArea;
      var blocklyDiv = this.$refs.blocklyDiv;
      this.workspace = Blockly.inject(blocklyDiv,
          {toolbox: this.$refs.toolbox,
           media: 'blockly-media/' });
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

          var xml = Blockly.Xml.workspaceToDom(this.workspace);
          var xml_text = Blockly.Xml.domToText(xml);
          localStorage.setItem("blockly", xml_text);

          // update the store
          this.$store.dispatch('setCode', code)
          // this.$store.dispatch('setBlockly', xml_text)
        }
      });

      
      // Recolor predefined blocks
      this.recolor(Blockly.Blocks['text'], "%{BKY_ACTIONS_RGB}");
      this.recolor(Blockly.Blocks['text_print'], "%{BKY_ACTIONS_RGB}");

      this.recolor(Blockly.Blocks['controls_repeat_ext'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['controls_whileUntil'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['controls_for'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['controls_forEach'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['controls_flow_statements'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['controls_if'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['procedures_defnoreturn'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['procedures_defreturn'], "%{BKY_FLOW_RGB}");
      this.recolor(Blockly.Blocks['procedures_ifreturn'], "%{BKY_FLOW_RGB}");

      this.recolor(Blockly.Blocks['variables_set'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['variables_get'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_change'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_compare'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_operation'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_negate'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_boolean'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_null'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['logic_ternary'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_number'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_arithmetic'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_single'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_trig'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_constant'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_number_property'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_round'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_on_list'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_modulo'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_constrain'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_random_int'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_random_float'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['math_atan2'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_create_empty'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_create_with'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_repeat'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_length'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_isEmpty'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_indexOf'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_getIndex'], "%{BKY_DATA_RGB}");
      this.recolor(Blockly.Blocks['lists_setIndex'], "%{BKY_DATA_RGB}");



      ////////////////////////////////////////////////////////////////////////////////////////
      //                                 Block definitions                                  //
      ////////////////////////////////////////////////////////////////////////////////////////

      // Blockly block definition
      Blockly.Blocks['move'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("move ")
              .appendField(new Blockly.FieldDropdown([
                ['forward', 'forward'],
                ['backward', 'backward']
              ]), 'direction')
              .appendField("with speed")
              .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['move'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let direction = block.getFieldValue('direction');
        let speed = block.getFieldValue('speed');
        let code = `zoef.move('${direction}', ${speed})\n`;
        return code;
      };

      // Blockly block definition
      Blockly.Blocks['turn'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("turn ")
              .appendField(new Blockly.FieldDropdown([
                ['left', 'left'],
                ['right', 'right']
              ]), 'direction')
              .appendField("speed")
              .appendField(new Blockly.FieldNumber(1), "speed");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['turn'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let direction = block.getFieldValue('direction');
        let speed = block.getFieldValue('speed');
        let code = 'zoef.turn(\'' + direction + '\', ' + speed + ')\n';
        return code;
      };


      // Blockly block definition
      Blockly.Blocks['display_text'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("display text")
              .appendField(new Blockly.FieldTextInput("Hello, World!"), "text");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['display_text'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let text = block.getFieldValue('text');
        let code = `zoef.displayText("${text}")\n`;
        return code;
      };

      // Blockly generator
      Blockly.Blocks['get_keypad'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("ingedrukte knop")
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_keypad'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let code = `zoef.getKeypad("yellow")`;
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_pin_value'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("analoge waarde van pin")
              .appendField(new Blockly.FieldNumber(1), "pin");
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_pin_value'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let pin = block.getFieldValue('pin');
        let code = `zoef.getAnalogPinValue(${pin})`;
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
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_virtual_color'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
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
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_barcode'] = function(block) {
        // TODO: Assemble JavaScript into code letiable.
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let code = `zoef.getBarcode()`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly block definition
      Blockly.Blocks['turnAngle'] = {
        init: function() {
          this.appendDummyInput()
              .appendField("turn with angle ")
              .appendField(new Blockly.FieldAngle(90), "angle");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['turnAngle'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let angle_angle = block.getFieldValue('angle');
        let code = 'zoef.turnAngle(' + angle_angle + ')\n';
        return code;
      };


      // Blockly block definition
      Blockly.Blocks['wait'] = {
        init: function() {
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

      // Blockly generator
      Blockly.Python['wait'] = function(block) {
        Blockly.Python.definitions_['import_time'] = 'import time';
        let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
        let code = 'time.sleep(' + value_wait + ')\n';
        return code;
      };


      // Blockly generator
      Blockly.Blocks['get_intensity'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("lichtwaarde van ")
            .appendField(new Blockly.FieldDropdown([['links', 'left'], ['rechts', 'right']]), 'sensor');
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl(""); 
        }
      };

      Blockly.Python['get_intensity'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let sensor = block.getFieldValue('sensor');
        let code = `zoef.getIntensity('${sensor}')`;
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_distance'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("afstandwaarde van ")
            .appendField(new Blockly.FieldDropdown([['links', 'left'], ['rechts', 'right']]), 'sensor');
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");	
        }
      };

      Blockly.Python['get_distance'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let sensor = block.getFieldValue('sensor');
        let code = `zoef.getDistance('${sensor}')`;
        return [code, Blockly.Python.ORDER_NONE];
      };

      // Blockly generator
      Blockly.Blocks['get_encoder'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("aantal wielbewegingen van ")
            .appendField(new Blockly.FieldDropdown([['links', 'left'], ['rechts', 'right']]), 'sensor');
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      Blockly.Python['get_encoder'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let sensor = block.getFieldValue('sensor');
        let code = `zoef.getEncoder('${sensor}')`;
        return [code, Blockly.Python.ORDER_NONE];
      };


      Blockly.Blocks['wait_until'] = {
        init: function() {
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


      // Blockly generator
      Blockly.Python['wait_until'] = function(block) {
        Blockly.Python.definitions_['import_time'] = 'import time';
        let value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
        let code = "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
        // TODO: make sleep depend on frequency of topic
        return code;
      };

      // Blockly block definition
      Blockly.Blocks['set_digital_pin_value'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("zet waarde van digitale pin ")
            .appendField(new Blockly.FieldNumber(1), "pin")
            .appendField("op")
            .appendField(new Blockly.FieldDropdown([['0', '0'], ['1', '1']]), 'value');
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
        }
      };

      // Blockly generator
      Blockly.Python['set_digital_pin_value'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let pin = block.getFieldValue('pin');
        let value = block.getFieldValue('value');
        let code = `zoef.setDigitalPinValue(${pin}, ${value})\n`;
        return code;
      };

      Blockly.Blocks['set_led_value'] = {
        init: function() {
          this.appendValueInput("value")
              .setCheck("Number")
              .appendField("zet LED waarde op")
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
        }
      };

      // Blockly generator
      Blockly.Python['set_led_value'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let led_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `zoef.setLED(${led_value})\n`;
        return code;
      };


      Blockly.Blocks['set_servo_angle'] = {
        init: function() {
          this.appendValueInput("angle")
              .setCheck("Number")
              .appendField("zet servo op hoek ")
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
        }
      };

      // Blockly generator
      Blockly.Python['set_servo_angle'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `zoef.setServoAngle(${angle})\n`;
        return code;
      };


      Blockly.Blocks['set_motor_speed'] = {
        init: function() {
          this.appendValueInput("speed")
              .setCheck("Number")
              .appendField("zet snelheid van de")
              .appendField(new Blockly.FieldDropdown([['linker', 'left'], ['rechter', 'right']]), 'motor')
              .appendField("motor op ");
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
        }
      };

      // Blockly generator
      Blockly.Python['set_motor_speed'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let motor = block.getFieldValue('motor');
        let speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `zoef.setMotorSpeed('${motor}', ${speed})\n`;
        return code;
      };

      // Blockly generator
      Blockly.Blocks['get_timestamp'] = {
        init: function() {
          this.appendDummyInput()
            .appendField("tijd sinds")
            .appendField(new Blockly.FieldDropdown([['begin', 'start'], ['laatste aanroep', 'call']]), 'version');
          this.setOutput(true, null);
          this.setColour("%{BKY_FLOW_RGB}");
          this.setTooltip("");
          this.setHelpUrl("");	
        }
      };

      Blockly.Python['get_timestamp'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'import robot\nzoef=robot.createRobot()';
        let version = block.getFieldValue('version');
        let code = `zoef.getTimestamp()`;
        if (version.localeCompare("start") != 0){
           code = `zoef.getTimeSinceLastCall()`;
        }
        return [code, Blockly.Python.ORDER_NONE];
      };



      // Load xml from previous session
      var storage = localStorage.getItem("blockly");
      if (storage !== null) {
          var xml = Blockly.Xml.textToDom(storage);
          Blockly.Xml.domToWorkspace(xml, this.workspace);
          // this.$store.dispatch('setBlockly', xml)
      }

      

    }
  }
</script>
