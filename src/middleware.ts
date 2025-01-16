import { NextRequest, NextResponse } from "next/server";
import { ulid } from "ulidx";

export default function middleware(request: NextRequest): NextResponse {
    const response = NextResponse.next();
    const chatIdPresent = request.cookies.has("chatId");

    if (!chatIdPresent) {
        response.cookies.set("chatId", ulid());
    }
    return response;
}