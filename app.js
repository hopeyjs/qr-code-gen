const { urlencoded } = require('express');
const express = require('express');
const app = express();
const qrcode = require('qrcode');
const PORT = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get('/', (req, res) => {
    res.render("index");
})

app.post('/scan', (req, res) => {
    const text = req.body.text

    qrcode.toDataURL(text, (err, src) => {
        res.render('scan', {
            qr_code: src
        });
    })
    
});

app.listen(PORT, console.log(`Server running on Port ${PORT}`))