"use client";

import { useSearchParams } from "next/navigation";

export default function Shortened() {
    const location = window.location;
    const searchParams = useSearchParams();
    const hash = searchParams.get("hash");
    const shortenedUrl = `${location.origin}/${hash}`;

    return <div>Your shorneted URL: {shortenedUrl}</div>;
}
