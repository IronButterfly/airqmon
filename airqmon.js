const zigbeeHerdsmanConverters = require('zigbee-herdsman-converters');
 
const exposes = zigbeeHerdsmanConverters.exposes;
const ea = exposes.access;
const e = exposes.presets;
 
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
 
const device = {
    zigbeeModel: ['AirQMon'],
    model: 'AirQMon',
    vendor: 'SLS',
    description: 'CO₂ sensor',
    supports: 'CO₂ and temperature',
    fromZigbee: [fz.airqmon_co2, fz.airqmon_temperature],
    toZigbee: [],
    exposes: [e.co2(), e.temperature(),],
};
 
module.exports = device;
