export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_text_output',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['print_phone_text_output'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_TEXT_OUTPUT}",
		  "args0": [
        {
          "type": "field_input",
          "name": "TEXT",
          "text": "text"
        },
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
      "previousStatement": null,
      "nextStatement": null,
		  "extensions": ["dynamic_instances_extension_phone_text_output"]
             });
        }
    };

    Blockly.Python['print_phone_text_output'] = function (block) {
      Blockly.Python.definitions_['import_phone'] = 'from mirte_robot import phone\nphoneAPI=phone.createPhone()';
      let instance = block.getFieldValue('INSTANCE');
      let text = block.getFieldValue('TEXT');
      let code = `phoneAPI.printText('${instance}', '${text}')`;
      return code;
    };
}
