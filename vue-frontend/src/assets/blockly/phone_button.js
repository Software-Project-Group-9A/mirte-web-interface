export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_button',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['get_value_phone_button'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_BUTTON}",
		  "args0": [
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
                  "output": "Boolean",
		  "extensions": ["dynamic_instances_extension_phone_button"]
             });
        }
    };

    Blockly.Python['get_value_phone_button'] = function (block) {
      Blockly.Python.definitions_['import_phone'] = 'from mirte_robot import phone\nphoneAPI=phone.createPhone()';
      let instance = block.getFieldValue('INSTANCE');
      let code = `phoneAPI.getButtonValue('${instance}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
