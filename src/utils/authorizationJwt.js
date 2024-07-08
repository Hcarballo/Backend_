export const authorization = (role) => {
    return async (res,req,next) => {
        console.log(req.user);
        if(!req.user) return res.status(401).send({error:'Autorizado'});
        if(req.user.user.role != role) return res.status(401).send({error: 'No Autorizado'});
        next();
    }
}