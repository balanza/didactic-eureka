# TCP CHAT

## Question

Write a very simple chat server that should listen on TCP port 10000 for clients. The chat protocol is very simple, clients connect with "telnet" and write single lines of text. On each new line of text, the server will broadcast that line to all other connected clients. Your program should be fully tested too.

## Run test

```
npm i
npm test
```

## Start sever

```
node index.js # start on port 10000
node index.js 9090 # start on port 9090
```