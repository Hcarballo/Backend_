export function auth(req, res, next) {
    if (req.session?.user?.email === 'adminCoder@coder.com' && req.session?.user?.password === 'adminCod3r123') {
        return next();
    }
    return res.status(401).send('error de autorización');
}