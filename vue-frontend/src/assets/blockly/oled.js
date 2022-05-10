export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_oled',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    Blockly.Blocks['set_oled_oled'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_SET_OLED}",
		  "args0": [
		    {
		      "type": "input_dummy",
		      "name": "INSTANCE",
		    },
		    {
		      "type": "field_dropdown",
		      "name": "TYPE",
		      "options": [
		        [
		          "text",
		          "TEXT"
		        ],
		        [
		          "image",
		          "IMAGE"
		        ],
		        [
		          "animation",
		          "ANIMATION"
		        ]
		      ]
		    },
		    {
		      "type": "input_value",
		      "name": "VALUE",
		      "check": "String"
		    }
		  ],
		  "inputsInline": true,
		  "previousStatement": null,
		  "nextStatement": null,
                  "colour": "%{BKY_ACTIONS_RGB}",
                  "extensions": ["dynamic_instances_extension_oled"]
            });
        }
    };


    Blockly.Python['set_oled_oled'] = function (block) {
        Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
        let value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
        let type = block.getFieldValue('TYPE');
        let instance = block.getFieldValue('INSTANCE');
        let code = '';
        if (type == "TEXT"){
           code = `mirte.setOLEDText('${instance}', ${value})\n`;
        }
        if (type == "IMAGE"){
           code = `mirte.setOLEDImage('${instance}', ${value})\n`;
        }
        if (type == "ANIMATION"){
           code = `mirte.setOLEDAnimation('${instance}', ${value})\n`;
        }
        return code;
    };

}
