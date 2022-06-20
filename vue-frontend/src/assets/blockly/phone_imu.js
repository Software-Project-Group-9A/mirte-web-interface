export function load (Blockly, instances) {

    if (instances.length === 0) {
        instances = [["NO PERIPHERAL CONFIGURED","NO PERIPHERAL CONFIGURED"]]
    }

    Blockly.Extensions.register('dynamic_instances_extension_phone_imu',
    function() {
      this.getInput('INSTANCE')
      .appendField(new Blockly.FieldDropdown(instances), 'INSTANCE');
    });

    // ROTATION BLOCK
    Blockly.Blocks['get_rotation_phone_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_IMU_ORIENTATION}",
		  "args0": [
        {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    },
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
		  "extensions": ["dynamic_instances_extension_phone_imu"]
            });
        }
    };

    Blockly.Python['get_rotation_phone_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let axis = block.getFieldValue('AXIS');
      let code = `mirte.getImuRotation('${instance}', '${axis}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };

    // LINEAR ACCELERATION BLOCK
    Blockly.Blocks['get_linear_acceleration_phone_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_IMU_LINEAR_ACCELERATION}",
		  "args0": [
        {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    },
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
		  "extensions": ["dynamic_instances_extension_phone_imu"]
            });
        }
    };

    Blockly.Python['get_linear_acceleration_phone_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let axis = block.getFieldValue('AXIS');
      let code = `mirte.getImuLinearAcceleration('${instance}', '${axis}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };

    // ANGULAR VELOCITY BLOCK
    Blockly.Blocks['get_angular_velocity_phone_imu'] = {
        init: function () {
            this.jsonInit({
		  "type": "block_type",
		  "message0": "%{BKY_PHONE_IMU_ANGULAR_VELOCITY}",
		  "args0": [
        {
		      "type": "input_dummy",
		      "name": "INSTANCE"
		    },
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
		  "extensions": ["dynamic_instances_extension_phone_imu"]
            });
        }
    };

    Blockly.Python['get_angular_velocity_phone_imu'] = function (block) {
      Blockly.Python.definitions_['import_mirte'] = 'from mirte_robot import robot\nmirte=robot.createRobot()';
      let instance = block.getFieldValue('INSTANCE');
      let axis = block.getFieldValue('AXIS');
      let code = `mirte.getImuAngularVelocity('${instance}', '${axis}')`;
      return [code, Blockly.Python.ORDER_NONE]
    };
}
