import React, { useEffect } from "react";

export default function Env() {
    useEffect(() => {
        console.log("API:", import.meta.env.VITE_API_URL);
        console.log("TOKEN:", import.meta.env.VITE_TOKEN_KEY);
    }, []);

    return <div>ENV Test</div>;
}
