"use server";

import { revalidatePath } from "next/cache";
import { turso } from "./turso";
import { redirect } from "next/navigation";

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

export async function createOrder(formData: FormData, productsLength: number){
    let errorMessage;
    let products = [];
    try {
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const region = formData.get("region") as string;
        const postalCode = formData.get("postalCode") as string;
        const total = Number(formData.get("total"));

        for (let i = 0; i < productsLength; i++) {
            const productName = formData.get(`product${i}`) as string;
            const size = formData.get(`size${i}`) as string ;
            const terpens = formData.get(`terpens${i}`) as string;
            const price = Number(formData.get(`price${i}`));
            const quantity = Number(formData.get(`quan${i}`));
    
            // Construct product object
            const product = {
                name: productName,
                size: size,
                terpens: terpens,
                price: price,
                quantity: quantity,
            };
    
            products.push(product);
        }
        console.log(products);
        const result = await turso.execute({
            sql:`INSERT INTO Orders (email, name, surname, phone, country, address, city, region, postal_code,total )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?) RETURNING id;`,
            args: [email, name, surname, phone, country, address, city, region, postalCode, total]
        });
        const orderId = Number(result.rows[0].id);
        console.log(orderId);
        for (const product of products) {
            
                await turso.execute({
                    sql:`INSERT INTO OrderedProducts (name, size, terpens, price, quantity, order_id)
                    VALUES (?, ?, ?, ?, ?, ?);`,
                    args: [product.name, product.size, product.terpens, product.price, product.quantity, orderId]
                });
            }
            revalidatePath("/checkout");
    redirect("/");
    } catch (error) {
        console.error(error);
        
    }
    
    return{
        errorMessage
    }
}