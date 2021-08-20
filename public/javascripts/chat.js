let socket;

document.addEventListener(
    'DOMContentLoaded',
    function(){
        socket = io();
        socket.on("connect", () => {
            document.getElementsByClassName('title').item(0).setAttribute('style', 'color:green;')
        })
        socket.on("connect_error", () => {
            setTimeout(() => {
                socket.connect();
            }, 1000);
            document.getElementsByClassName('title').item(0).setAttribute('style', 'color:red;')
        });
        socket.on("disconnect", (reason) => {
            document.getElementsByClassName('title').item(0).setAttribute('style', 'color:red;')
        });
        socket.on("chat-message", onChatMessage)
    }
)

function onSubmitMessage() {
    const el = document.getElementsByClassName("new-message").item(0)
    const message = el.value
    if (!message || message.length === 0) {
        console.error(message)
        return;
    }
    socket.emit('chat-message', message)
    el.value = '';
}

function onChatMessage(msg) {
    const msgElement = document.createElement('li')
    msgElement.textContent = msg
    document.getElementsByClassName('chat')
        .item(0)
        .prepend(
            msgElement
        )
}

