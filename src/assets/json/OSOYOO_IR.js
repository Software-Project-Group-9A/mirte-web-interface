export function load(Blockly) {
    Blockly.Blocks['waddle'] = {
        init: function () {
            this.appendValueInput("speed")
                .setCheck("Number")
                .appendField("zet snelheid van de")
                .appendField(new Blockly.FieldDropdown([['linker', 'left'], ['rechter', 'right']]), 'motor')
                .appendField("motor op ");
            this.setColour(230);
            this.setTooltip("");
            this.setHelpUrl("");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("%{BKY_ACTIONS_RGB}");
        }
    };

    Blockly.Python['waddle'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
        let motor = block.getFieldValue('motor');
        let speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
        let code = `zoef['${motor}'].setMotorSpeed(${speed})\n`;
        return code;
    };
}