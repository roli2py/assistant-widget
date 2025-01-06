const Message = dynamic(() => import("@/components/message"), { ssr: false });

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";

import type IMessage from "@/components/interfaces/imessage";

import type { MutableRefObject } from "react";


export default function Chat(
    { messages }:
    {
        messages: IMessage[]
    }
) {
    const chatRef: MutableRefObject<null | HTMLElement> = useRef(null);

    const messagesComponents = messages.map((message, index) => {
        return (
            <Message key={index} role={message.role} text={message.text} />
        );
    });

    useEffect(() => {
        if (chatRef !== null) {
            const chat = chatRef.current
            if (chat instanceof HTMLElement) {
                const timer = setTimeout(() => {
                    chat.scrollTop = chat.scrollHeight;
                }, 300);
    
                return () => clearTimeout(timer);
            }
        }
    }, [messagesComponents]);

    return (
        <main ref={chatRef} className="chat">
            <ul className="messages">
                {messagesComponents}
            </ul>
        </main>
    );
}