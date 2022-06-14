const availableImages = [['zoef_logo', 'zoef_logo']];

export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_image_output',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['set_image_phone_image_output'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_IMAGE_OUTPUT}",
		  "args0": [
            {
                "type": "field_dropdown",
                "name": "IMAGE",
                "options": availableImages
            },
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
                  "output": "Boolean",
		  "extensions": ["dynamic_instances_extension_phone_image_output"]
             });
        }
    };

    Blockly.Python['set_image_phone_image_output'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let instance = block.getFieldValue('INSTANCE');
        let image = block.getFieldValue('IMAGE');
        let code = `mirte.setImage('${instance}', '${image}')`;
        return [code, Blockly.Python.ORDER_NONE]
    };
}
