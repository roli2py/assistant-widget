import IMessage from "@/components/interfaces/imessage";
import settings from "@/components/settings.json";

import { io, Socket } from "socket.io-client";

import type { Dispatch, MutableRefObject, SetStateAction } from "react";


export default class ChatCommunicator {
    #socketRef: MutableRefObject<null | Socket>
    #chatId: number
    #messages: IMessage[]
    #setMessages: Dispatch<SetStateAction<IMessage[]>>
    #setCanWriting: Dispatch<SetStateAction<boolean>>

    constructor(
        socketRef: MutableRefObject<null | Socket>,
        chatId: number,
        messages: IMessage[],
        setMessages: Dispatch<SetStateAction<IMessage[]>>,
        setCanWriting: Dispatch<SetStateAction<boolean>>
    ) {
        this.#socketRef = socketRef
        this.#chatId = chatId
        this.#messages = messages
        this.#setMessages = setMessages
        this.#setCanWriting = setCanWriting
    }

    establish() {
        const socket = io(settings.backend.url, {
                extraHeaders: {
                    "Authorization": `Bearer ${settings.backend.token}`
                }
            }
        );

        this.#socketRef.current = socket

        while (!socket.connected) {
            socket.on("message", text => {
                this.#setCanWriting(true);
                
                const message = {
                    role: "operator",
                    text
                }

                console.log(this.#messages);
                
                this.#setMessages([...this.#messages, message]);
            });
        
            socket.on("error", error => {
                console.error(error);
            });

            return () => {
                socket.disconnect();
            }
        }
    }

    sendMessage(text: string) {
        this.#setCanWriting(false);
    
        const message = {
            role: "user",
            text
        }

        console.log(this.#messages);
    
        this.#setMessages([...this.#messages, message]);
    
        if (this.#socketRef !== null) {
            const socket = this.#socketRef.current
            if (socket instanceof Socket) {
                // Exception: InvalidStateError
                socket.send(this.#chatId, text);
            }
        }
    }
}