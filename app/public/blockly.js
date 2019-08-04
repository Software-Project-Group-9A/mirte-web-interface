
// TODO: make more flexible, dependant on used blocks
Blockly.Python.finish = function(code) { 
   return "import robot\nimport time\n\n" + code;
};




  Blockly.BlockSvg.START_HAT = true;


//https://groups.google.com/forum/#!topic/blockly/yUBEymLKBbk
// for some reason Blockly.Msg["MATH_HUE"] = "#193863"; does not work
  function recolor(block, hue) { 
    var oldInit = block.init; 
    block.init = function() { 
      oldInit.call(this); 
      this.setColour(hue); 
    } 
  } 


//  recolor(Blockly.Blocks['keyispressed'], 10); 
//  recolor(Blockly.Blocks['onclick'], 10);
  recolor(Blockly.Blocks['get_distance'], 10);


  recolor(Blockly.Blocks['controls_repeat_ext'], 60); 
  recolor(Blockly.Blocks['controls_whileUntil'], 60);
  recolor(Blockly.Blocks['controls_for'], 60);
  recolor(Blockly.Blocks['controls_forEach'], 60);
  recolor(Blockly.Blocks['controls_flow_statements'], 60);

  recolor(Blockly.Blocks['wait'], 60);
  recolor(Blockly.Blocks['wait_until'], 60);

  recolor(Blockly.Blocks['controls_if'], 60);


  recolor(Blockly.Blocks['logic_compare'], 210);
  recolor(Blockly.Blocks['logic_operation'], 210);
  recolor(Blockly.Blocks['logic_negate'], 210);
  recolor(Blockly.Blocks['logic_boolean'], 210);
  recolor(Blockly.Blocks['logic_null'], 210);
  recolor(Blockly.Blocks['logic_ternary'], 210);

//  recolor(Blockly.Blocks['getpressedkey'], 210);

  recolor(Blockly.Blocks['math_number'], 210);
  recolor(Blockly.Blocks['math_arithmetic'], 210);
  recolor(Blockly.Blocks['math_single'], 210);
  recolor(Blockly.Blocks['math_trig'], 210);

  recolor(Blockly.Blocks['math_constant'], 210);
  recolor(Blockly.Blocks['math_number_property'], 210);
  recolor(Blockly.Blocks['math_round'], 210);
  recolor(Blockly.Blocks['math_on_list'], 210);
  recolor(Blockly.Blocks['math_modulo'], 210);
  recolor(Blockly.Blocks['math_constrain'], 210);
  recolor(Blockly.Blocks['math_random_int'], 210);
  recolor(Blockly.Blocks['math_random_float'], 210);
  recolor(Blockly.Blocks['math_atan2'], 210);

  recolor(Blockly.Blocks['lists_create_empty'], 210);
  recolor(Blockly.Blocks['lists_create_with'], 210);
  recolor(Blockly.Blocks['lists_repeat'], 210);
  recolor(Blockly.Blocks['lists_length'], 210);
  recolor(Blockly.Blocks['lists_isEmpty'], 210);
  recolor(Blockly.Blocks['lists_indexOf'], 210);
  recolor(Blockly.Blocks['lists_getIndex'], 210);
  recolor(Blockly.Blocks['lists_setIndex'], 210);

  recolor(Blockly.Blocks['text'], 120);
  recolor(Blockly.Blocks['text_print'], 120);
  recolor(Blockly.Blocks['turn'], 120);
  recolor(Blockly.Blocks['move'], 120);
//  recolor(Blockly.Blocks['move_with_speed'], 120);

  
  var demoWorkspace = Blockly.inject('blocklyDiv',
        {
         toolbox: document.getElementById('toolbox')
        });


    // Load xml from previous session
    var storage = localStorage.getItem("blockly");
    if (storage !== null) {
        var xml = Blockly.Xml.textToDom(storage);
        Blockly.Xml.domToWorkspace(xml, demoWorkspace);
    }

    var highlightPause = false;
    var latestCode = '';

    function highlightBlock(id) {
      demoWorkspace.highlightBlock(id);
      highlightPause = true;
    }


    // Load the interpreter now, and upon future changes.
    //generateCodeAndLoadIntoInterpreter();
    demoWorkspace.addChangeListener(function(event) {
        //console.log(event);
        if (event instanceof Blockly.Events.Move || event instanceof Blockly.Events.Delete || event instanceof Blockly.Events.Change) {
        // Something changed. Parser needs to be reloaded.
    
          var code = Blockly.Python.workspaceToCode(demoWorkspace);
          editor.setValue(code);



        var xml = Blockly.Xml.workspaceToDom(demoWorkspace);
        var xml_text = Blockly.Xml.domToText(xml);
        localStorage.setItem("blockly", xml_text);



      }
    });



    var blocklyArea = document.getElementById('blocklyArea');
    var blocklyDiv = document.getElementById('blocklyDiv');

    var onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + 'px';
      blocklyDiv.style.top = y + 'px';
      blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
      blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(demoWorkspace);
    };
    window.addEventListener('resize', onresize, false);
    onresize();
    Blockly.svgResize(demoWorkspace);



// Keep menu open after drop
demoWorkspace.toolbox_.flyout_.autoClose = false

