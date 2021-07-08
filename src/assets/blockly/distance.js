export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['get_value_ultrasound_distance_sensor'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("lichtwaarde van ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance');
        this.setOutput(true, null);
        this.setColour("%{BKY_SENSORS_RGB}");
        this.setTooltip("");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['get_value_ultrasound_distance_sensor'] = function (block) {
      Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('instance');
      let code = `mirte['${instance}'].get_intensity()`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}