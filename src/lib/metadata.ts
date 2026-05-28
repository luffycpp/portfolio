import { Metadata } from "next";

export function constructMetadata({
    title = "Luffycpp | Advanced Software Architect",
    description = "Full-stack developer and security researcher specialized in AI integration, system architecture, and advanced network security.",
    image = "/og-image.jpg",
    icons = "/globe.svg",
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@luffycpp",
        },
        icons,
        metadataBase: new URL("https://luffycpp.dev"),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
