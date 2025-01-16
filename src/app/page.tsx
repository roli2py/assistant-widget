import Widget from "@/components/widget";
import MessagesReceiver from "@/components/messages-receiver";

import { cookies } from "next/headers";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReactElement } from "react";


export default async function Page(): Promise<ReactElement> {
    const backendToken = process.env.ASSISTANT_BACKEND_TOKEN as string;
    const backendPublicUrl = process.env.ASSISTANT_BACKEND_PUBLIC_URL as string;

    const cookieStore = await cookies();
    const chatId = (cookieStore.get("chatId") as ResponseCookie).value;

    const savedMessages = await MessagesReceiver.receive(chatId);

    return <Widget backendToken={backendToken} backendPublicUrl={backendPublicUrl} chatId={chatId} savedMessages={savedMessages} />
}
