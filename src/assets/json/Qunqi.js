export function load (Blockly) {
    Blockly.Blocks['Meow'] = {
      init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([['analoge', 'analog'], ['digitale', 'digital']]), 'type')
            .appendField("waarde van pin")
            .appendField(new Blockly.FieldNumber(1), "pin");
        this.setOutput(true, null);
        this.setColour("%{BKY_SENSORS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['Meow'] = function (block) {
      // TODO: Assemble JavaScript into code letiable.
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
      let pin = block.getFieldValue('pin');
      let type = block.getFieldValue('type');
      let code = "";
      if (type === "analog") {
        code = `zoef.getAnalogPinValue(${pin})`;
      } else {
        code = `zoef.getDigitalPinValue(${pin})`;
      }
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.Python.ORDER_NONE];
    };
}