import { z } from "zod";

// Define Zod schema for form validation
export const orderSchema = z.object({
  email: z.string().email({ message: "Špatný formát emailu" }),
  phone: z.string().min(9, { message: "Telefonní číslo musí mít alespoň 9 číslic" }),
  name: z.string().min(1, { message: "Jméno je nutné" }),
  surname: z.string().min(1, { message: "Přijmení je nutné" }),
  country: z.string().min(1, { message: "Země je nutná" }),
  address: z.string().min(1, { message: "Ulice je nutná" }),
  city: z.string().min(1, { message: "Město je nutné" }),
  region: z.string(), // Region is optional
  postalCode: z.string().min(1, { message: "PSČ je nutné" }),
  total: z.number().positive({ message: "Total musí být positivní číslo" }),
  packetaId: z.number().positive({ message: "Id Zásilkovny musí být positivní číslo" }),
});
