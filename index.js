const express = require('express');
const path = require('path');
const fs = require('fs')
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
    const filePath = path.join(__dirname, req.url + '.html');

    const exist = fs.existsSync(filePath)

    exist ? res.sendFile(filePath) : res.sendFile(path.join(__dirname, '404.html'));
});

app.listen(3000);