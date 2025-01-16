import type IMessage from "@/components/interfaces/imessage";


export default class MessagesReceiver {
    static async receive(chatId: string): Promise<IMessage[]> {
        try {} catch (error) {
            if (error instanceof TypeError) {
                console.log(`${error.name} occured!`);
            }
        }

        // Exception: TypeError
        const response = await fetch(`http://backend:5000/messages?chatId=${chatId}`, {
            headers: {
                "Authorization": `Bearer ${process.env.ASSISTANT_BACKEND_TOKEN}`,
                "Content-Type": "application/json; charset=utf-8"
            }
        });
        const responseJson: { answer: IMessage[] } = await response.json();

        // Status: not 200 - 299
        if (!response.ok) {
            console.log(responseJson);
        }

        const messages = responseJson.answer;
        return messages;
    }
}