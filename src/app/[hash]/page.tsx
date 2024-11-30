import { routes } from "@/utils/utils";
import { redirect } from "next/navigation";

type ResponseData = {
    fullUrl: string;
};

async function getFullUrl(hash: string): Promise<string> {
    const route = routes.getURLRoute(hash);
    const response = await fetch(route);

    if (!response.ok) {
        throw await response.json();
    }

    const data: ResponseData = await response.json();

    return data.fullUrl as string;
}

export default async function RedirectToFullUrl({
    params,
}: {
    params: Promise<{ hash: string }>;
}) {
    const hash = (await params).hash;
    let fullUrl = "";
    try {
        fullUrl = await getFullUrl(hash);
    } catch (err) {
        console.error(err);
        redirect("/record-not-found")
    }

    redirect(fullUrl);
}
