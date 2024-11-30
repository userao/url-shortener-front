"use client";

import { routes } from "@/utils/utils";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useRouter } from "next/navigation"

interface FormValues {
    rawUrl: string;
}

type ResponseData = {
    urlHash: string
}

async function getUrlHash(rawUrl: FormValues): Promise<string> {
    const route = routes.createURLRoute();
    const response = await fetch(route, {
        method: "POST",
        body: JSON.stringify(rawUrl),
        mode: "cors",
    });

    if (!response.ok) {
        throw await response.json();
    }

    const data: ResponseData = await response.json()

    return data.urlHash;
}

export default function URLForm() {
    const initialValues: FormValues = { rawUrl: "" };
    const [submitState, setSubmitState] = useState("not submitted");
    const router = useRouter()

    async function handleSubmit(values: FormValues) {
        setSubmitState("submitting");

        try {
            const urlHash = await getUrlHash(values);
            setSubmitState("success");
            console.log(urlHash);
            router.push(`/shortened?hash=${urlHash}`)
        } catch (err: any) {
            setSubmitState("error");
            console.error(err);
        }
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="border border-1 bg-gray-300 p-0">
                    <div className="flex p-4 gap-2">
                        <Field
                            type="test"
                            name="rawUrl"
                            placeholder="https://www.example.com"
                        ></Field>
                        <button
                            type="submit"
                            className="rounded-md border border-1 border-gray-400 px-2"
                        >
                            Shorten
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}
