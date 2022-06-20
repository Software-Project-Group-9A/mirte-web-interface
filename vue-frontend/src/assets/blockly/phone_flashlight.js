const options = [['%{BKY_ON}', 'True'], ['%{BKY_OFF}', 'False']];

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
        Blockly.Python.definitions_['import_phone'] = 'from mirte_robot import phone\nphoneAPI=phone.createPhone()';
        let flashlight = block.getFieldValue('INSTANCE');
        let state = block.getFieldValue('FLASH');
        let code = `phoneAPI.setFlashlight('${flashlight}', ${state})`;
        console.log(code);
        return code
    };
}
