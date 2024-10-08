"use server";

import { revalidatePath } from "next/cache";
import { turso } from "./turso";
import { redirect } from "next/navigation";
import { orderSchema } from "./schema";
import { z } from "zod";
type Order = {
    email: string;
    phone: string;
    name: string;
    surname: string;
    country: string;
    address: string;
    city: string;
    region: string;
    postalCode:  string;
    total: number;
    packetaId: number;
}
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
    let errorMessage: string = "";
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
    let products = [];
    try {
        const orderData: Order = {
            email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      name: formData.get("name") as string,
      surname: formData.get("surname") as string,
      country: formData.get("country") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      region: formData.get("region") as string,
      postalCode: formData.get("postalCode") as string,
      total: Number(formData.get("total")),
      packetaId: Number(formData.get("packetaId")),
        }
        const validatedData = orderSchema.parse(orderData);

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
        console.log(validatedData)
        const result = await turso.execute({
            sql:`INSERT INTO Orders (email, name, surname, phone, country, address, city, region, postal_code,total,packetaId )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?) RETURNING id;`,
            args: [validatedData.email, validatedData.name, validatedData.surname, validatedData.phone, validatedData.country, validatedData.address, validatedData.city, validatedData.region, validatedData.postalCode, validatedData.total, validatedData.packetaId]
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
            
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Handle validation error
            console.error("Validation errors:", error.errors);
            // Return validation errors to the frontend or handle them as needed
            return { errorMessage: "Validation failed", errors: error.errors };
          }else {
            console.error("Unexpected error:", error);
            return { errorMessage: "An unexpected error occurred", error };
        }
    }
    redirect("/");
    
}