export function load (Blockly, instances) {
    Blockly.Blocks['drive'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("Laat motor ")
            //.appendField(instances, 'instance')
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
            .appendField(" rijden met snelheid ");
        this.appendValueInput("speed")
            .setCheck("Number")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['drive'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      let speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
      return `zoef['${instance}'].drive(${speed})\n`;
    };

    Blockly.Blocks['stop'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("Laat motor ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
            .appendField(" stoppen");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['stop'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      return `zoef['${instance}'].stop()\n`;
    };
}