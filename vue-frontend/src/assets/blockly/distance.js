export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_distance',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['get_value_distance'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_ULTRASONIC_SENSOR}",
		  "args0": [
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
                  "output": "Number",
		  "extensions": ["dynamic_instances_extension_distance"]
             });
        }
    };

    Blockly.Python['get_value_distance'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let code = `mirte.getDistance('${instance}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
