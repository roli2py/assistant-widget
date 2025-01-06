import settings from "@/components/settings.json";

import Image from "next/image";

import type { Dispatch, SetStateAction, MouseEvent, ReactElement } from "react";


export default function SendButton(
    { text, setText, sendMessage, canWriting, setTextboxHeight }:
    {
        text: string,
        setText: Dispatch<SetStateAction<string>>,
        sendMessage: (text: string) => void,
        canWriting: boolean,
        setTextboxHeight: Dispatch<SetStateAction<string>>
    }
): ReactElement {
    function handleSendKey(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        if (canWriting && text.trim()) {
            sendMessage(text);
            setText("");
            setTextboxHeight("32px");
        }
    }

    return (
        <button
            type="button"
            className="send-button"
            onClick={handleSendKey}
            disabled={!canWriting}
        >
            <Image
                src={settings.visual.sendIconUrl}
                alt="Send"
                width={300}
                height={300}
            />
            <div className="visually-hidden">
                Send
            </div>
        </button>
    );
}
