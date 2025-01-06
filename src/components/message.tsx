import showdownConverterProxy from "@/components/showdown-converter-proxy";
import escapeHtmlExceptCode from "@/components/html-escape";


export default function Message(
    { key, role, text }:
    {
        key: number,
        role: string,
        text: string
    }
) {
    const converter = showdownConverterProxy.converter;

    return (
        <li key={key} className={`message ${role}`}>
            <div className="message-background">
                <p className="message-text" dangerouslySetInnerHTML={{ __html: converter.makeHtml(escapeHtmlExceptCode(text)) }} />
            </div>
        </li>
    );
}