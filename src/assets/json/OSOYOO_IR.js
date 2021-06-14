export function load (Blockly, instances) {

    if (instances.length == 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['waddle'] = {
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

    Blockly.Python['waddle'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      return `zoef['${instance}'].stop()\n`;
    };
}