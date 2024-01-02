const {} = require('zigbee-herdsman-converters/lib/modernExtend');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const ota = require('zigbee-herdsman-converters/lib/ota');
const tuya = require('zigbee-herdsman-converters/lib/tuya');
const {} = require('zigbee-herdsman-converters/lib/tuya');
const utils = require('zigbee-herdsman-converters/lib/utils');
const globalStore = require('zigbee-herdsman-converters/lib/store');
const e = exposes.presets;
const ea = exposes.access;

const fz = {
        airqmon_co2: { 
      cluster: 'genAnalogInput',
      type: ['attributeReport', 'readResponse'],
      convert: (model, msg, publish, options) => {
            if (msg.endpoint.ID == 2 && msg.data['presentValue'] >= 400) {
                return {co2: msg.data['presentValue']};
            }
        },
    },
    
    airqmon_temperature: { 
      cluster: 'genAnalogInput',
      type: ['attributeReport', 'readResponse'],
      convert: (model, msg, publish, options) => {
            if (msg.endpoint.ID == 1) {
                return {temperature: msg.data['presentValue']};
            }
        },
    },       
};

const definition = {
    zigbeeModel: ['AirQMon'],
    model: 'AirQMon',
    vendor: 'SLS',
    description: 'CO₂ sensor',
    extend: [],
    fromZigbee: [fz.airqmon_co2, fz.airqmon_temperature],
    toZigbee: [],
    exposes: [e.co2(), e.temperature()],
};

module.exports = definition;
