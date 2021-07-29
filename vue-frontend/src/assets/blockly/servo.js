export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_servo',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['set_angle_servo'] = {
        init: function () {
            this.jsonInit({
                  "type": "block_type",
                  "message0": "%{BKY_SET_SERVO_ANGLE}",
                  "args0": [
                    {
                      "type": "input_dummy",
                      "name": "INSTANCE"
                    },
                    {
                      "type": "input_value",
                      "name": "ANGLE",
                      "check": "Number"
                    }
                  ],
                  "inputsInline": true,
                  "previousStatement": null,
                  "nextStatement": null,
                  "colour": "%{BKY_ACTIONS_RGB}",
                  "extensions": ["dynamic_instances_extension_servo"]
            });
        }
    };

    Blockly.Python['set_angle_servo'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let angle = Blockly.JavaScript.valueToCode(block, 'ANGLE', Blockly.JavaScript.ORDER_ATOMIC);
      return `mirte.setServoAngle('${instance}', ${angle})\n`;
    };

}
