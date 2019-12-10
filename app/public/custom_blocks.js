function generatePWMBlock(options){
  // Blockly block definition
  Blockly.Blocks['pwm'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Set PWM of  ")
        .appendField(new Blockly.FieldDropdown(options), 'motor')
        .appendField("to value")
        .appendField(new Blockly.FieldNumber(1), "speed");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(130);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };

  // Blockly generator
  Blockly.Python['pwm'] = function(block) {
    let motor = block.getFieldValue('motor');
    let speed = block.getFieldValue('speed');
    let code = `zoef.setMotorPWM('${motor}', ${speed})\n`;
    return code;
  };
}

// Blockly block definition
Blockly.Blocks['move'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Move ")
        .appendField(new Blockly.FieldDropdown([
          ['forward', 'forward'],
          ['backward', 'backward']
        ]), 'direction')
        .appendField("with speed")
        .appendField(new Blockly.FieldNumber(1), "speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['move'] = function(block) {
  let direction = block.getFieldValue('direction');
  let speed = block.getFieldValue('speed');
  let code = `zoef.move('${direction}', ${speed})\n`;
  return code;
};

// Blockly block definition
Blockly.Blocks['turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn ")
        .appendField(new Blockly.FieldDropdown([
          ['left', 'left'],
          ['right', 'right']
        ]), 'direction')
        .appendField("speed")
        .appendField(new Blockly.FieldNumber(1), "speed");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['turn'] = function(block) {
  let direction = block.getFieldValue('direction');
  let speed = block.getFieldValue('speed');
  let code = 'zoef.turn(\'' + direction + '\', ' + speed + ')\n';
  return code;
};


// Blockly block definition
Blockly.Blocks['display_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Display text")
        .appendField(new Blockly.FieldTextInput("Hello, World!"), "text");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['display_text'] = function(block) {
  let text = block.getFieldValue('text');
  let code = `zoef.displayText("${text}")\n`;
  return code;
};

// Blockly generator
Blockly.Blocks['get_pin_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get analog pin value")
        .appendField(new Blockly.FieldNumber(1), "pin");
    this.setOutput(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['get_pin_value'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let pin = block.getFieldValue('pin');
  let code = `zoef.getPinValue(${pin})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Blockly generator
Blockly.Blocks['get_virtual_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get a color from the camera ")
        .appendField(new Blockly.FieldDropdown([
          ['left', 'left'],
          ['right', 'right']
        ]), 'direction')
    this.setOutput(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['get_virtual_color'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let direction = block.getFieldValue('direction');
  let code = `zoef.getVirtualColor('${direction}')`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Blockly generator
Blockly.Blocks['get_barcode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get a barcode or qr code from the camera ")
    this.setOutput(true, null);
    this.setColour(160);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Python['get_barcode'] = function(block) {
  // TODO: Assemble JavaScript into code letiable.
  let code = `zoef.getBarcode()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

// Blockly block definition
Blockly.Blocks['turnAngle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn with angle ")
        .appendField(new Blockly.FieldAngle(90), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['turnAngle'] = function(block) {
  let angle_angle = block.getFieldValue('angle');
  let code = 'zoef.turnAngle(' + angle_angle + ')\n';
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
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Blockly generator
Blockly.Python['wait'] = function(block) {
  let value_wait = Blockly.Python.valueToCode(block, 'wait', Blockly.Python.ORDER_ATOMIC);
  let code = 'time.sleep(' + value_wait + ')\n';
  return code;
};


function generateIntensityBlock(options){
  // Blockly generator
  Blockly.Blocks['get_intensity'] = {

    init: function() {
      this.appendDummyInput()
        .appendField("get intensity of ")
        .appendField(new Blockly.FieldDropdown(options), 'sensor');
      this.setOutput(true, null);
      this.setColour(160);
  this.setTooltip("");
   this.setHelpUrl(""); 
    }
  };

  Blockly.Python['get_intensity'] = function(block) {
    let sensor = block.getFieldValue('sensor');
    let code = `zoef.getIntensity('${sensor}')\n`;
    return [code, Blockly.Python.ORDER_NONE];
  };
}



function generateDistanceBlock(options){
	// Blockly generator
  Blockly.Blocks['get_distance'] = {

    init: function() {
      this.appendDummyInput()
        .appendField("get distance of ")
        .appendField(new Blockly.FieldDropdown(options), 'sensor');
      this.setOutput(true, null);
      this.setColour(160);
  this.setTooltip("");
   this.setHelpUrl("");	
    }
  };

  Blockly.Python['get_distance'] = function(block) {
    let sensor = block.getFieldValue('sensor');
    let code = `zoef.getDistance('${sensor}')\n`;
    return [code, Blockly.Python.ORDER_NONE];
  };
}

Blockly.Blocks['wait_until'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck("Boolean")
        .appendField("Wait until");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


// Blockly generator
Blockly.Python['wait_until'] = function(block) {
  let value_condition = Blockly.Python.valueToCode(block, 'condition', Blockly.Python.ORDER_ATOMIC);
  let code = "wait_cond = " + value_condition + "\nwhile not(wait_cond):\n\ttime.sleep(.1)\n\twait_cond = " + value_condition + "\n";
  // TODO: make sleep depend on frequency of topic
  return code;
};
