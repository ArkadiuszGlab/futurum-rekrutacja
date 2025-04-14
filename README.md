# FuturumRekrutacja

This project was made as a test recruitment exercise for Futurum Technology.

## Development server

This project needs at least Node.js version v18.19

```
https://nodejs.org/en
```

Clone this repo and then in the terminal, write:

```
cd .\futurum-rekrutacja\
npm install
npm start
```

To run the backend, you need to install json-server. Make sure you are in the same folder as db.json. In a separate terminal window, write:

```
cd .\futurum-rekrutacja\
npm install -g json-server
json-server --watch db.json --port 3001
```

If you choose other port you need to change apiUrl(campaigns.service.ts line 11) to match your port.

# Project Structure

A brief overview of the project files/folders to help developers understand the structure. For example:

```
futurum-rekrutacja/
├── src/
│   ├── app/
│   ├── assets/
│   └── services/
├── db.json
├── package.json
├── README.md
└── tsconfig.json
```

# Technologies Used

```
Frontend: Angular, TypeScript
Backend: JSON Server
Style: Vanilla CSS
```

# Running Tests

```
ng test --code-coverage
```
