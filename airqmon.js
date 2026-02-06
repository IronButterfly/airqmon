const exposes = require('zigbee-herdsman-converters/lib/exposes');
const e = exposes.presets;

const fzLocal = {
    airqmon_co2: {
        cluster: 'genAnalogInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID === 2 && msg.data.hasOwnProperty('presentValue')) {
                const value = parseFloat(msg.data['presentValue']);
                if (value >= 400) {
                    return {co2: value};
                }
            }
        },
    },
    airqmon_temperature: {
        cluster: 'genAnalogInput',
        type: ['attributeReport', 'readResponse'],
        convert: (model, msg, publish, options, meta) => {
            if (msg.endpoint.ID === 1 && msg.data.hasOwnProperty('presentValue')) {
                return {temperature: parseFloat(msg.data['presentValue'])};
            }
        },
    },
};

const definition = {
    zigbeeModel: ['AirQMon'],
    model: 'AirQMon',
    vendor: 'SLS',
    description: 'CO2 and Temperature sensor',
    fromZigbee: [fzLocal.airqmon_co2, fzLocal.airqmon_temperature],
    toZigbee: [],
    exposes: [e.co2(), e.temperature()],
};

module.exports = definition;
