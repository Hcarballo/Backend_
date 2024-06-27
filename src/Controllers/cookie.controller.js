class CookieController {
    constructor() { };

    setcookie = (req, res) => {
        res.cookie('Hernan', 'Hola, probando cookie', { maxAge: 100000 }).send('cookie');
    };

    getCookie = (req, res) => {

        res.send(req.signedCookies);
    };

    deleteCookie = (req, res) => {
        res.clearCookie('Hernan').send('cookie borrada');
    };

    signedCookie = (req, res) => {
        res.cookie('Hernan', 'Hola, probando cookie', { maxAge: 100000, signed: true }).send('cookie firmada');
    };

    session = (req, res) => {
        if (req.session.counter) {
            req.session.counter++;
            res.send(`Se visito la pag ${req.session.counter} veces`)

        } else {
            req.session.counter = 1;
            res.send('Bienvenido');
        }
    };

    logout = (req, res) => {
        req.session.destroy(err => {
            if (err) return res.send({ status: 'error', error: err });
            else return res.send('logout');
        })
    };
}

export default CookieController;