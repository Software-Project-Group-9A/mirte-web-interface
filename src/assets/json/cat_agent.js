export function load (Blockly) {
    Blockly.Blocks['Meow'] = {
        init: function () {
        this.appendValueInput("value")
            .setCheck(['Boolean'])
            .appendField("zet waarde van digitale pin ")
            .appendField(new Blockly.FieldTextInput("D0"), "pin")
            .appendField("op")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['Meow'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
      console.log(value)
      let code = `zoef.setDigitalPinValue('${pin}', ${value})\n`;
      return code;
    };

    Blockly.Blocks['Infiltrate'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("display text")
            .appendField(new Blockly.FieldTextInput("Hello, World!"), "text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['Infiltrate'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let text = block.getFieldValue('text');
      let code = `zoef.displayText("${text}")\n`;
      return code;
    };
}