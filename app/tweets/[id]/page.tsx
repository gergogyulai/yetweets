import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(id: string) {
    const res = await fetch(`https://raw.githubusercontent.com/kanyewesst/ye-tweets/main/data/${id}.json`)
    
    if (!res.ok) {
        // Log error details if the response is not OK
        console.error(`Error fetching data: ${res.status} ${res.statusText}`)
        return null;
    }

    const text = await res.text();  // Get the raw text response

    try {
        return JSON.parse(text);  // Try parsing the text as JSON
    } catch (error) {
        console.error("Failed to parse JSON", error);
        console.error("Received response:", text);  // Log the raw response for inspection
        return null;  // Return null or handle accordingly
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    return (
        <pre>
            {data ? JSON.stringify(data, null, 2) : notFound()}
        </pre>
    )
}