// Blockly block definition
Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move forward")
        .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 15, 15, "*"));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['move'] = function(block) {
  var code = 'robot.move()\n';
  return code;
};


// Blockly block definition
Blockly.Blocks['turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn ")
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['turn'] = function(block) {
  var angle_angle = block.getFieldValue('angle');
  var code = 'robot.turn(' + angle_angle + ')\n';
  return code;
};


// Blockly block definition
Blockly.Blocks['wait'] = {
  init: function() {
    this.appendValueInput("wait")
        .setCheck("Number")
        .appendField("Wait ");
    this.appendDummyInput()
        .appendField("second(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['wait'] = function(block) {
  var value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
  var code = 'time.sleep(' + value_wait + ')\n';
  return code;
};



// Blockly generator
Blockly.Blocks['get_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get distance");
    this.setOutput(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Python['get_distance'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'robot.getDistance()';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};






Blockly.Blocks['wait_until'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("Wait until");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Blockly generator
Blockly.Python['wait_until'] = function(block) {
  var value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  var code = "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
  // TODO: make sleep depend on frequency of topic
  return code;
};
