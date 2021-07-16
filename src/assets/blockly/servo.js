export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['set_angle_servo'] = {
        init: function () {
          this.appendValueInput("angle")
              .setCheck("Number")
              .appendField("zet servo ")
              .appendField(new Blockly.FieldDropdown(instances), 'instance')
              .appendField("op hoek ")
          this.setColour(230);
          this.setTooltip("");
          this.setHelpUrl("");
          this.setPreviousStatement(true, null);
          this.setNextStatement(true, null);
          this.setColour("%{BKY_ACTIONS_RGB}");
        }
    };

    Blockly.Python['set_angle_servo'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      let angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
      return `mirte.setServoAngle('${instance}', ${angle})\n`;
    };

}
