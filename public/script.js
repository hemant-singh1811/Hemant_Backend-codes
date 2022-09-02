let socket = io();

let username = document.getElementById("username")
let uname = '';
let loginbtn = document.getElementById("loginbtn")
let chatbox = document.getElementById("chatbox")
let loginbox = document.getElementById('loginbox')
let sendbtn = document.getElementById("sendbtn");
let dochat = false;
let username1 = document.getElementById('name')
let chat = document.getElementById('chat')
let logoutbtn = document.getElementById("logoutbtn")
let sender = document.getElementById("sender")
let online = document.createElement('online')

let duplicate = false;


logoutbtn.onclick = function () {
    console.log('you clicked');

    socket.emit("logout");

    localStorage.setItem("username", '');
    location.reload()
}

let socket1 = io({

});


socket.on("connect", () => {
    console.log('connected');
})


// socket.on('connect', () => console.log('connected'))
// socket.on('reconnect', () => {
//     socket.emit('register',{
//         username:uname
//     })
//     console.log('reconnect')
// })

function connect() {
    console.log('connecting... ');
    socket.emit('register', {
        username: localStorage.getItem("username")
    })
}



socket.on('connecting', () => {
    console.log('connecting1')
    connect()
})



socket.on('reconnecting', () => {
    console.log('reconnecting')
    connect()
})



socket.on('connect_failed', () => {

    console.log('connect_failed')
    connect()
})


socket.on('reconnect_failed', () => {
    console.log('reconnect_failed')
    connect()
})


socket.on('close', () => {
    console.log('close')
    connect()
})


socket.on('disconnect', () => {
    console.log('disconnect')
    connect()
})




if (localStorage.getItem("username") == undefined || localStorage.getItem("username") == "") {
    console.log('not found ');
} else {
    register()
}

loginbtn.onclick = function () {
    let name = username.value
    console.log('username : ', name);
    socket.emit("register", {
        username: name
})

    socket.on("wronguser", (data) => {
        if (!data.duplicate) {
            // new user
            //call to function
            console.log("is duplicate :",data.duplicate);
            register(name)
        } else {
            // already register user
        }
    })
}

// function emit(event, data) {
//     return new Promise((resolve, reject) => {
//         if (!this.socket) {
//             reject('No socket connection.');
//         } else {
//             this.socket.emit(event, data, (response) => {
//                 if (response.error) {
//                     console.error(response.error);
//                     reject(response.error);
//                 } else {
//                     resolve();
//                 }
//             });
//         }
//     });
// }



function register(d) {
    chatbox.style.display = 'flex'
    loginbox.style.display = 'none'

     localStorage.setItem("username", d);

    dochat = true;

    uname = localStorage.getItem("username")
    console.log('username1 : ', username.value);
    //emit socket to server to make a room
    username1.innerText = localStorage.getItem("username")

}


socket.on("OnUser", (data) => {
    if (dochat == false) return;
    let onlineuser = data.onusers;
    sender.innerHTML = ''
    console.log("online :", onlineuser);
    console.log("Online Users : ");

    console.log(localStorage.getItem("username"));
    onlineuser.forEach(element => {
        if (element != localStorage.getItem("username")) {
            let option = document.createElement("option")
            option.innerText = element;
            let span = document.createElement('span')
            span.innerHTML = element;
            online.appendChild(span)

            sender.appendChild(option)
            console.log(element);
        }
    });
})


// btn.onclick=function()
// {
//     console.log('logout btn clickedß');

//     localStorage.setItem('username','');

//     dochat=false;
//     socket.emit("logout")

//     document.location.reload()
// }

sendbtn.onclick = function () {
    if (dochat) {
        console.log('sending the message ');

        let message = document.getElementById('msg');
        let to = document.getElementById('sendto');

        var e = document.getElementById("sender");
        var value = e.value;
        var text = e.options[e.selectedIndex].text;
        console.log("selected :", text);
        //emit socket to server to sendmsg
        socket.emit('msg_send', {
            from: username.value,
            msg: message.value,
            to: text
        })

    } else {
        //user not registered do something





    }
}

socket.on("msg_rcd", (data) => {

    console.log('rcd', data.message);

    let message = document.createElement('span');
    let to = document.createElement('span')
    let time = document.createElement('span')

    let div = document.createElement('div')

    message.innerText = data.message;
    to.innerText = data.from;
    time.innerText = getTime();


    div.appendChild(message);
    div.appendChild(to);
    div.appendChild(time)

    chat.appendChild(div)

})

getTime();

function getDate() {
    let today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log('Now : ', today);

    return today
}

function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // console.log('Now : ', time);
    return time;
}

socket.on("getback", (data) => {
    console.log('back');
})