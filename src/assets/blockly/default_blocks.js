export function load(Blockly) {

    Blockly.Blocks['set_analog_pin_value'] = {
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

    Blockly.Python['set_analog_pin_value'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
        let pin = block.getFieldValue('pin');
        let value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
        return `zoef.setAnalogPinValue('${pin}', ${value})\n`;
    };

    Blockly.Blocks['get_pin_value'] = {
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

    Blockly.Python['get_pin_value'] = function (block) {
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

    Blockly.Blocks['wait'] = {
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

    Blockly.Python['wait'] = function (block) {
        Blockly.Python.definitions_['import_time'] = 'import time';
        let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
        return 'time.sleep(' + value_wait + ')\n';
    };

    Blockly.Blocks['wait_until'] = {
        init: function () {
            this.appendValueInput("condition")
                .setCheck("Boolean")
                .appendField("wacht totdat");
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour("%{BKY_FLOW_RGB}");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['wait_until'] = function (block) {
        Blockly.Python.definitions_['import_time'] = 'import time';
        let value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
        // TODO: make sleep depend on frequency of topic
        return "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
    };

    Blockly.Blocks['get_timestamp'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("tijd sinds")
                .appendField(new Blockly.FieldDropdown([['begin', 'start'], ['laatste aanroep', 'call']]), 'version');
            this.setOutput(true, null);
            this.setColour("%{BKY_FLOW_RGB}");
            this.setTooltip("");
            this.setHelpUrl("");
        }
    };

    Blockly.Python['get_timestamp'] = function (block) {
        Blockly.Python.definitions_['import_zoef'] = 'from zoef_robot import robot\nzoef=robot.createRobot()';
        let version = block.getFieldValue('version');
        let code = `zoef.getTimestamp()`;
        if (version.localeCompare("start") !== 0) {
            code = `zoef.getTimeSinceLastCall()`;
        }
        return [code, Blockly.Python.ORDER_NONE];
    };
}