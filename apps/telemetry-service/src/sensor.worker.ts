const { parentPort } = require('node:worker_threads');

// имитация опроса сенсора
async function pollSensor(sensor) {
  console.log('Опрашиваем датчик', sensor.id);
  const newValue = Math.random() * 100;
  return {
    sensorId: sensor.id,
    value: newValue,
  };
}

parentPort.on('message', async sensor => {
  const result = await pollSensor(sensor);
  parentPort.postMessage(result);
});
