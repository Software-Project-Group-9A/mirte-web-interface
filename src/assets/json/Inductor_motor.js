import Blockly from "blockly";

export function load (Blockly) {
    Blockly.Blocks['Woof'] = {
        init: function () {
        this.appendValueInput("value")
            .setCheck(['Number'])
            .appendField("zet waarde van analoge pin ")
            .appendField(new Blockly.FieldTextInput("A0"), "pin")
            .appendField("op")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['Woof'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
      return `zoef.setAnalogPinValue('${pin}', ${value})\n`;
    };

    Blockly.Blocks['Drive'] = {
        init: function () {
        this.appendValueInput("value")
            .setCheck(['Number'])
            .appendField("I DRIVE ")
            .appendField(new Blockly.FieldTextInput("A0"), "pin")
            .appendField("op")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['Drive'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
      return `zoef.setAnalogPinValue('${pin}', ${value})\n`;
    };
}