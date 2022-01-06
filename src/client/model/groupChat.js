let groupname = '';

document.addEventListener('DOMContentLoaded', function () {

    fetch('/group/get-groupName')
        .then(function (response) {
            return response.json()
        })
        .then(function (_value) {
            let group_name = _value[0].groupName;

            groupname = `'${group_name}'`;

            let groupDiv = document.createElement('div');
            groupDiv.id = `'${group_name}'`;
            document.body.appendChild(groupDiv);

            //Input Zone 
            let inputZone = document.createElement('div');
            inputZone.id = `'${group_name}'`;
            groupDiv.appendChild(inputZone);


            //Chat form            
            let chatForm = document.createElement("form")
            chatForm.setAttribute("id", "chat-form")
            inputZone.appendChild(chatForm)

            //Message field
            let messageHolder = document.createElement("input");
            messageHolder.setAttribute("type", "text");
            messageHolder.setAttribute("name", "msgHolder")
            messageHolder.setAttribute("placeholder", "enter message")
            messageHolder.setAttribute("class", "vertical-align custom-input")
            chatForm.appendChild(messageHolder)

            //Send button
            let sendBtn = document.createElement("button")
            sendBtn.setAttribute("class", "vertical-align btn")
            sendBtn.setAttribute("id", "send-button")
            sendBtn.setAttribute("type", "submit")
            sendBtn.innerHTML = "Send"
            chatForm.appendChild(sendBtn)

            //Group info form            
            let groupInfo = document.createElement("form")
            groupInfo.setAttribute("id", "info-form")
            groupInfo.setAttribute("action", "/information")
            inputZone.appendChild(groupInfo)

            let infoBtn = document.createElement("button")
            infoBtn.setAttribute("class", "vertical-align btn")
            infoBtn.setAttribute("id", "info-button")
            infoBtn.setAttribute("type", "submit")
            infoBtn.innerHTML = "See group info"
            groupInfo.appendChild(infoBtn)


        })

}, false);
