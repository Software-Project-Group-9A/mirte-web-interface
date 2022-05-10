export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_l298n',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });


    Blockly.Blocks['set_speed_motor_l298n'] = {
	init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_SET_MOTOR_SPEED}",
		  "args0": [
		    {
		      "type": "input_dummy",
                      "name": "INSTANCE"
		    },
		    {
		      "type": "input_value",
		      "name": "SPEED",
		      "check": "Number"
		    }
		  ],
		  "inputsInline": true,
		  "previousStatement": null,
		  "nextStatement": null,
		  "colour": "%{BKY_ACTIONS_RGB}",
                  "extensions": ["dynamic_instances_extension_l298n"]
            });
        }
    };

    Blockly.Python['set_speed_motor_l298n'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let instance = block.getFieldValue('INSTANCE');
        let speed = Blockly.Python.valueToCode(block, 'SPEED', Blockly.Python.ORDER_ATOMIC)
        return `mirte.setMotorSpeed('${instance}', ${speed})\n`;
    };






    Blockly.Blocks['stop_motor_l298n'] = {
        init: function () {
            this.jsonInit({
                  "type": "block_type",
                  "message0": "%{BKY_STOP_MOTOR}",
                  "args0": [
                    {
                      "type": "input_dummy",
                      "name": "INSTANCE"
                    }
                  ],
                  "inputsInline": true,
                  "previousStatement": null,
                  "nextStatement": null,
                  "colour": "%{BKY_ACTIONS_RGB}",
                  "extensions": ["dynamic_instances_extension_l298n"]
            });
        }
    };

    Blockly.Python['stop_motor_l298n'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let instance = block.getFieldValue('INSTANCE');
        return `mirte.setMotorSpeed('${instance}', 0)\n`;
    };
}
