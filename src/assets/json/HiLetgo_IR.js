export function load (Blockly, instances) {

    Blockly.Blocks['dab'] = {
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

    Blockly.Python['dab'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      return `zoef['${instance}'].stop()\n`;
    };
}