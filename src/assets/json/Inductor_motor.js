export function load (Blockly, instances) {

    if (instances.length == 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['drive'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("Laat ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
            .appendField(" MYRTE rijden voor ");
        this.appendValueInput("duration")
            .setCheck("Number")
            .appendField(" seconded met snelheid ");
        this.appendValueInput("speed")
            .setCheck("Number")
            .appendField(".");
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
      let duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_ATOMIC);
      let speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
      return `zoef['${instance}'].drive(${duration}, ${speed})\n`;
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