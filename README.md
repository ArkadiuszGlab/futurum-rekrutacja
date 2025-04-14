# FuturumRekrutacja

This project was made as a test recruitment exercise for Futurum Technology.

## Development server

clone this repo
in terminal write:

```
cd .\futurum-rekrutacja\
npm i
npm start
```

to turn on backend you need json-server
in other terminal than your frontend write:

```
npm install -g json-server
json-server --watch db.json --port 3001
```

If you choose other port you need to change apiUrl(campaigns.service.ts line 11) to match your port.
