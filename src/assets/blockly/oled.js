export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['set_oled_oled'] = {
        init: function () {
          this.appendValueInput("value")
            .setCheck(['String'])
            .appendField("laat op de ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
            .appendField("OLED de ")
            .appendField(new Blockly.FieldDropdown([['tekst', 'text'], ['afbeelding', 'image'], ['animatie', 'animation']]), 'type')
            .appendField("zien ")
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
          this.setTooltip("");
          this.setHelpUrl("");
        }
    };

    Blockly.Python['set_oled_oled'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nmirte=robot.createRobot()';
        let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
        let type = block.getFieldValue('type');
        let instance = block.getFieldValue('instance');
        let code = '';
        if (type == "text"){
           code = `mirte.setOLEDText('${instance}', ${value})\n`;
        }
        if (type == "image"){
           code = `mirte.setOLEDImage('${instance}', ${value})\n`;
        }
        if (type == "animation"){
           code = `mirte.setOLEDAnimation('${instance}', ${value})\n`;
        }
        return code;
    };

}
