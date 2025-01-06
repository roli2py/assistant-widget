"use client";
import { useEffect, type ReactElement } from "react";


export default function Error(
    { error, reset }:
    {
        error: Error & { digest?: string },
        reset: () => void
    }
): ReactElement {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <h1>Error!</h1>
            <button
                onClick={reset}
            >
                Try again
            </button>
        </>
    );
}