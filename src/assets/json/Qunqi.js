export function load (Blockly, instances, param) {

    if (instances.length == 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['set_speed'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("Zet de snelheid van ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
            .appendField(" op ");
        this.appendValueInput("speed")
            .setCheck("Number")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("tussen de -10 en de 10");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['set_speed'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nMIRTE=robot.createRobot()';
        let instance = block.getFieldValue('instance');
        let speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC)
        return `MIRTE['${instance}'].set_speed(${speed})\n`;
    };

    Blockly.Blocks['stop'] = {
        init: function () {
        this.appendDummyInput()
            .appendField("Stop ")
            .appendField(new Blockly.FieldDropdown(instances), 'instance')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("%{BKY_ACTIONS_RGB}");
        this.setTooltip("stopt de motor");
        this.setHelpUrl("");
        }
    };

    Blockly.Python['stop'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nMIRTE=robot.createRobot()';
        let instance = block.getFieldValue('instance');
        return `MIRTE['${instance}'].set_speed(0)\n`;
    };
}