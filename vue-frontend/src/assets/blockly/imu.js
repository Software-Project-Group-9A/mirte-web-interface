export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Blocks['get_rotation_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_IMU_ORIENTATION}",
		  "args0": [
        {
          "type": "field_dropdown",
          "name": "AXIS",
          "options": [
            [ "%{BKY_X_AXIS}", "X" ],
            [ "%{BKY_Y_AXIS}", "Y" ],
            [ "%{BKY_Z_AXIS}", "Z" ]
          ]
        }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
      "output": "Number",
            });
        }
    };

    Blockly.Python['get_rotation_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let axis = block.getFieldValue('AXIS');
      let code = `mirte.getRotation('${axis}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };

    // LINEAR ACCELERATION BLOCK
    Blockly.Blocks['get_linear_acceleration_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_IMU_LINEAR_ACCELERATION}",
		  "args0": [
		    {
          "type": "field_dropdown",
          "name": "AXIS",
          "options": [
            [ "%{BKY_X_AXIS}", "X" ],
            [ "%{BKY_Y_AXIS}", "Y" ],
            [ "%{BKY_Z_AXIS}", "Z" ]
          ]
        }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
      "output": "Number"
            });
        }
    };

    Blockly.Python['get_linear_acceleration_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let axis = block.getFieldValue('AXIS');
      let code = `mirte.getLinearAcceleration('${axis}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };

    // ANGULAR VELOCITY BLOCK
    Blockly.Blocks['get_angular_velocity_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_IMU_ANGULAR_VELOCITY}",
		  "args0": [
		    {
          "type": "field_dropdown",
          "name": "AXIS",
          "options": [
            [ "%{BKY_X_AXIS}", "X" ],
            [ "%{BKY_Y_AXIS}", "Y" ],
            [ "%{BKY_Z_AXIS}", "Z" ]
          ]
        }
		  ],
		  "inputsInline": true,
		  "colour": "%{BKY_SENSORS_RGB}",
      "output": "Number"
            });
        }
    };

    Blockly.Python['get_angular_velocity_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('AXIS');
      let code = `mirte.getAngularVelocity('${instance}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
