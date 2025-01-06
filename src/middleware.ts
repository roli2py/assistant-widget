import { NextRequest, NextResponse } from "next/server";
import getRandomId from "@/components/random-id";

export default function middleware(request: NextRequest): NextResponse {
    const response = NextResponse.next();
    if (!(request.cookies.has("chatId"))) {
        response.cookies.set("chatId", getRandomId().toString());
    }
    return response;
}