import Blockly from "blockly";

export function load (Blockly) {
    Blockly.Blocks['dab'] = {
      init: function () {
        this.appendValueInput("wait")
            .setCheck("Number")
            .appendField("wacht ");
        this.appendDummyInput()
            .appendField("seconden");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_FLOW_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
      }
    };

    Blockly.Python['dab'] = function (block) {
      Blockly.Python.definitions_['import_time'] = 'import time';
      let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
      return 'time.sleep(' + value_wait + ')\n';
    };
}