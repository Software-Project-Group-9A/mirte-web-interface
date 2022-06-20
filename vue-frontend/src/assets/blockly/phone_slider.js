export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    // Takes care of inserting instance names in "instance-choosing" field
    // such that users can choose between sliders 
    Blockly.Extensions.register('dynamic_instances_extension_phone_slider',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['get_value_phone_slider'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_SLIDER}",
		  "args0": [
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
                  "output": "Number",
		  "extensions": ["dynamic_instances_extension_phone_slider"]
             });
        }
    };

    Blockly.Python['get_value_phone_slider'] = function (block) {
      Blockly.Python.definitions_['import_phone'] = 'from mirte_robot import phone\nphoneAPI=phone.createPhone()';
      let instance = block.getFieldValue('INSTANCE');
      let code = `phoneAPI.getSliderValue('${instance}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
