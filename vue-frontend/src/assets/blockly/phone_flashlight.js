const options = [['on', 'true'], ['off', 'false']];

export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_flashlight',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['set_state_phone_flashlight'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_FLASHLIGHT}",
		  "args0": [
            {
                "type": "input_dummy",
                "name": "INSTANCE"
            },
            {
                "type": "field_dropdown",
                "name": "FLASH",
                "options": options
            }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
          "previousStatement": null,
          "nextStatement": null,
		  "extensions": ["dynamic_instances_extension_phone_flashlight"]
             });
        }
    };

    Blockly.Python['set_state_phone_flashlight'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let instance = block.getFieldValue('INSTANCE');
        let state = block.getFieldValue('FLASH');
        let code = `mirte.setFlashlight('${instance}', '${state}')`;
        return [code, Blockly.Python.ORDER_NONE]
    };
}
