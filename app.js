// Connect to HiveMQ Public Broker via WebSockets
const broker = 'wss://broker.hivemq.com:8884/mqtt';
const client = mqtt.connect(broker);

client.on('connect', () => {
    console.log("Connected to HiveMQ WebSocket Broker successfully!");
    // Subscribe to all ESP32 Alexis topics
    client.subscribe('esp32/alexis/#', (err) => {
        if (!err) {
            console.log("Subscribed to esp32/alexis/# topics!");
        }
    });
});

client.on('message', (topic, payload) => {
    const message = payload.toString();
    console.log(`[${topic}]: ${message}`);

    if (topic === 'esp32/alexis/temperature') {
        document.getElementById('temp').innerText = message + " °C";
    } else if (topic === 'esp32/alexis/humidity') {
        document.getElementById('humidity').innerText = message + " %";
    } else if (topic === 'esp32/alexis/led') {
        const el = document.getElementById('led');
        el.innerText = message;
        el.className = message === 'ON' ? 'value status-on' : 'value status-off';
    } else if (topic === 'esp32/alexis/servo') {
        const el = document.getElementById('servo');
        el.innerText = message;
        el.className = message === 'ON' ? 'value status-on' : 'value status-off';
    } else if (topic === 'esp32/alexis/buzzer') {
        const el = document.getElementById('buzzer');
        el.innerText = message;
        el.className = message === 'ON' ? 'value status-on' : 'value status-off';
    }
});