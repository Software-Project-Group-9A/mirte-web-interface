export function load(Blockly) {

    Blockly.Blocks['set_analog_pin_value'] = {
        init: function () {
            this.jsonInit({
		"type": "block_type",
		  "message0": "%{BKY_SET_ANALOG_PIN}",
		  "args0": [
		    {
		      "type": "field_input",
		      "name": "PIN",
		      "text": "A0"
		    },
		    {
		      "type": "input_value",
		      "name": "VALUE",
                      "check": "Number"
		    }
		  ],
		  "inputsInline": true,
		  "previousStatement": null,
		  "nextStatement": null,
		  "colour": "%{BKY_ACTIONS_RGB}"
            });
        }
    };

    Blockly.Python['set_analog_pin_value'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        var pin = block.getFieldValue('PIN');
        var value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
        return `mirte.setAnalogPinValue('${pin}', ${value})\n`;
    };

    Blockly.Blocks['set_digital_pin_value'] = {
        init: function () {
            this.jsonInit({
                "type": "block_type",
                  "message0": "%{BKY_SET_DIGITAL_PIN}",
                  "args0": [
                    {
                      "type": "field_input",
                      "name": "PIN",
                      "text": "D0"
                    },
		    {
    		      "type": "field_dropdown",
     		      "name": "VALUE",
     	 	      "options": [
       			 [
         		   "%{BKY_TRUE}",
          		   "True"
        		 ],
       			 [
          		   "%{BKY_FALSE}",
         		   "False"
        		 ]
      		      ]
                    },
                  ],
                  "inputsInline": true,
                  "previousStatement": null,
                  "nextStatement": null,
                  "colour": "%{BKY_ACTIONS_RGB}"
            });
        }
    };

    Blockly.Python['set_digital_pin_value'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        var pin = block.getFieldValue('PIN');
        var value = block.getFieldValue('VALUE');
        return `mirte.setDigitalPinValue('${pin}', ${value})\n`;
    };


    Blockly.Blocks['get_analog_pin_value'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_GET_ANALOG_PIN_VALUE}",
         	  "args0": [
		    {
                      "type": "field_input",
                      "name": "PIN",
                      "text": "A0"
		    }
		  ],
		  "inputsInline": true,
                  "output": "Number",
                  "colour": "%{BKY_SENSORS_RGB}"
             });
        }
    };

    Blockly.Python['get_analog_pin_value'] = function (block) {
        // TODO: Assemble JavaScript into code letiable.
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let pin = block.getFieldValue('PIN');
        let code = `mirte.getAnalogPinValue('${pin}')`;
        // TODO: Change ORDER_NONE to the correct strength.
        return [code, Blockly.Python.ORDER_NONE];
    };



    Blockly.Blocks['get_digital_pin_value'] = {
        init: function () {
            this.jsonInit({
                  "type": "block_type",
                  "message0": "%{BKY_GET_DIGITAL_PIN_VALUE}",
                  "args0": [
                    {
                      "type": "field_input",
                      "name": "PIN",
                      "text": "D0"
                    }
                  ],
                  "inputsInline": true,
                  "output": "Boolean",
                  "colour": "%{BKY_SENSORS_RGB}"
             });
        }
    };

    Blockly.Python['get_digital_pin_value'] = function (block) {
        // TODO: Assemble JavaScript into code letiable.
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let pin = block.getFieldValue('PIN');
        let code = `mirte.getDigitalPinValue('${pin}')`;
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
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let version = block.getFieldValue('version');
        let code = `mirte.getTimestamp()`;
        if (version.localeCompare("start") !== 0) {
            code = `mirte.getTimeSinceLastCall()`;
        }
        return [code, Blockly.Python.ORDER_NONE];
    };
}
