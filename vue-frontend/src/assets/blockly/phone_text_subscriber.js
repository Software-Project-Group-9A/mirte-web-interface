export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_text_subscriber',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['print_phone_text_subscriber'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_TEXT_SUBSCRIBER}",
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
      "output": "Boolean",
		  "extensions": ["dynamic_instances_extension_phone_text_subscriber"]
             });
        }
    };

    Blockly.Python['print_phone_text_subscriber'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let text = block.getFieldValue('TEXT');
      let code = `mirte.printText('${instance}', '${text}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
