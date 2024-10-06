"use server";

export async function createBasket(formData: FormData){
    const terpens = formData.get("terpens") as string;
    const quantity = formData.get("quantity");
    const size = formData.get("size");
    console.log(`${terpens}, ${quantity}, ${size}`);
}