export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }



    // Blockly generator
    Blockly.Blocks['get_ticks_encoder'] = {
      init: function() {
         this.appendDummyInput()
           .appendField("aantal wielbewegingen van ")
           .appendField(new Blockly.FieldDropdown(instances), 'instance');
          this.setOutput(true, null);
          this.setColour("%{BKY_SENSORS_RGB}");
      this.setTooltip("");
      this.setHelpUrl("");
      }
    };

    Blockly.Python['get_ticks_encoder'] = function(block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nmirte=robot.createRobot()';
        let instance = block.getFieldValue('instance');
        let code = `mirte.getEncoder('${instance}')`;
        return [code, Blockly.Python.ORDER_NONE];
    };
}
