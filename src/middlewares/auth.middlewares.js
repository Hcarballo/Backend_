export const auth = (role) => {
    return async (req, res, next) => {
        console.log(role, req.user)
        if (!req.user) return res.status(401).send({ status: 'error', error: 'Usuario no autorizado' });
        if (req.user.role != role) return res.status(403).send({ status: 'error', error: 'No tiene permisos' });
        next();
    }
}