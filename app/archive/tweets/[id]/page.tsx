import { metadata } from "@/app/layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from 'next'

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

export async function generateMetadata({ params: { id } }: { params: { id: string }}): Promise<Metadata> {
    return {
        title: `Tweet ${id} | Ye Tweets`,
        description: `View a Tweet by Kanye West`,
        openGraph: {
            title: `Tweet ${id} | Ye Tweets`,
            description: `View a Tweet by Kanye West on the Ye Tweets Archive`,
            images: [
                {
                    url: `/og.png`,
                    width: 1280,
                    height: 720,
                    alt: `Tweet ${id} | Ye Tweets`,
                },
            ],
        }
    }
}
  


export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    return (
        <div className="flex flex-col items-center p-4 lowercase">
            <div>Work in progress</div>
            <div>
                displaying raw data for tweet {params.id}
            </div>
            <Link href="/" className="underline">
                go to index
            </Link>
            <pre className="text-muted-foreground">
                {data ? JSON.stringify(data, null, 2) : notFound()}
            </pre>
        </div>
    )
}