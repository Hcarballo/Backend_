const socket = io();

let user;
let chat = document.querySelector('#chat');

Swal.fire({
    title: 'Bienvenido al Chat',
    input: 'text',
    text: 'Ingresa tu Nombre para comenzar',
    inputValidator: value => {
        return !value && 'Ingresa tu Nombre';
    },
    allowOutsideClick: false
})
    .then(result => {
        user = result.value;
    })

chat.addEventListener('keyup', evt => {
    if (evt.key == 'Enter') {
        if (chat.value.trim().length > 0) {
            socket.emit('message', { user, message: chat.value });
            chat.value = '';
        }
    }
})

socket.on('msgLog', data => {
    let date = new Date();
    let log =  document.getElementById('msglog');
    let msgs = '';
    data.forEach(msg => {
        msgs += `<li>${msg.user} - Dice: ${msg.message} </li><br>`;                    
    })

    log.innerHTML = msgs;  
})


