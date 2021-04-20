'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class P005107 extends ZwaveDevice {
  onMeshInit() {
	this.enableDebug();
    this.printNode();
    this.registerCapability('onoff', 'SWITCH_BINARY');
    this.registerCapability('alarm_siren', 'SWITCH_BINARY', {
	get: 'SWITCH_BINARY_GET',
      set: 'SWITCH_BINARY_SET',
      setParserV1: value => ({
        'Switch Value': (value) ? 'on/enable' : 'off/disable',
      }),
      report: 'SWITCH_BINARY_REPORT',
      reportParser: report => {
        if (report && report.hasOwnProperty('Value')) {
          if (report.Value === 'on/enable') {
            this.emit('SirenTrigger');
            return true;
          } else if (report.Value === 'off/disable') {
			 this.emit('SirenTriggerNo');
            return false;
          }
        }
        return null;
      },
    });
    this.registerCapability('measure_temperature', 'SENSOR_MULTILEVEL');
    this.registerCapability('alarm_tamper', 'NOTIFICATION');
    this.registerCapability('measure_battery', 'BATTERY');
    this.registerCapability('alarm_battery', 'BATTERY');








  }
}

module.exports = P005107;
