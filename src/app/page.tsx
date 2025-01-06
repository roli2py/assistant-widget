import Widget from "@/components/widget";
import MessagesReceiver from "@/components/messages-receiver";

import { cookies } from "next/headers";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReactElement } from "react";


export default async function Page(): Promise<ReactElement> {
    const cookieStore = await cookies();
    const chatId = Number((cookieStore.get("chatId") as ResponseCookie).value);

    const savedMessages = await MessagesReceiver.receive(chatId);

    return <Widget chatId={chatId} savedMessages={savedMessages} />
}
