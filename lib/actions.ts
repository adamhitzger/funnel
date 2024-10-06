"use server";

import { revalidatePath } from "next/cache";
import { turso } from "./turso";

export async function createBasket(formData: FormData){
    const terpens: string = formData.get("terpens") as string;
    const quantity: number = Number(formData.get("quantity"));
    const size: string = formData.get("size") as string;
    return {
        terpens,
        quantity,
        size
    }
}
export async function addNewsletter(formData: FormData){
    let errorMessage;
    try {
        const email = formData.get("email") as string;
        await turso.execute({
            sql:`INSERT INTO newsletter (email) VALUES (?)`,
            args: [email]
        });
    } catch (error) {
        console.error(error)
    }
    revalidatePath("/");
    return{
        errorMessage
    }
}