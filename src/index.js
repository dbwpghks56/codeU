const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const WebSocketProvider = require('y-websocket').WebsocketProvider;
const y = require('yjs');
const { configDotenv } = require('dotenv');

const app = express();
const server = http.createServer(app);

const env = configDotenv();
// const ws = new WebSocket('ws://192.168.0.86:8080/codemirror1234');

const doc = new y.Doc();

// use processe
const wsProvider = new WebSocketProvider(
  'ws://192.168.0.86:8080',
  'codemirror1234',
  doc,
  {
    WebSocketPolyfill: require('ws'),
    connect: false
  })

  wsProvider.connect();

  wsProvider.on('status', event => {
    if(event.status === 'connected') {
      console.log('connected');
      wsProvider.ws.onmessage = (event) => {
        const buffer = Buffer.from(event.data);

        // Buffer를 문자열로 변환합니다.
        const data = buffer.toString('utf8');
        console.log(data);
      }
    }
  })



const port = process.env.PORT || 8080;
// 서버 시작

app.listen(port, () => {
  console.log(`${port || 8080}`);
});