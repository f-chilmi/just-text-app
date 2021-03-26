conn = new WebSocket(protocol + document.location.host + "/ws/" + userId + "?access_token=" + access['token']);
conn.onclose = function (evt) {
    appendLog("Connection closed.");
};
conn.onmessage = function (evt) {
    let messages = evt.data.split('\n');
    for (let i = 0; i < messages.length; i++) {
        var plainMessage = messages[i];
        var formattedMessage = JSON.parse(plainMessage);
        //this means, when incoming message is an acknowledge that current user message was sent to receiver, then..
        if(formattedMessage['fromUserId'] == access['_id']) {
            //if current user is opening that chat log according to this message
            if($("#send_chat_button").attr("to_user_id") == formattedMessage["toUserId"]) {
                addMessage(false, true,"Me",formattedMessage['data']);
            } else {
                notifyNewMessage(formattedMessage['fromUserId'], false); //without bg change
            }
        } else { //this means, when incoming message is from other people send message to current user
            //if current user is opening that chat log according to this message
            if($("#send_chat_button").attr("to_user_id") == formattedMessage["fromUserId"]) {
                addMessage(false, false,$("#send_chat_button").attr("to_user_name"),formattedMessage['data']);
            } else { //if current user is NOT opening that chat log according to this message
                notifyNewMessage(formattedMessage['fromUserId']);
            }
        }

        
    }
};