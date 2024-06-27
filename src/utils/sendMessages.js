import { messageModel } from '../models/messages.models.js';

export const sendMessages = (io) => {

    let msgs = [];
    io.on("connection", (socket) => {
        console.log("nuevo cliente conectado");

        socket.on("message", async (data) => {
            let date = new Date();
            const { user, message } = data;
            let _msg = {
                user: user,
                msg: message,
                hour: String(`${date.getHours()}:${date.getMinutes()}`)
            }
            await messageModel.create(_msg);
            console.log('message:', data);

            msgs.push(data);

            io.emit('msgLog', msgs);
        })
    })
};
