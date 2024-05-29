export function auth(req, res, next) {
    console.log(req.session.user)
    if (req.session.user?.role === 'admin') {
        return next();
    }
    return res.status(401).send('error de autorización');
}
