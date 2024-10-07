'use client'

import { useState, useEffect, useTransition, startTransition } from 'react'
import Image from 'next/image'
import { useCart } from '@/lib/card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'
import { createOrder } from '@/lib/actions'

declare global {
    interface Window {
        Packeta: any;
    }
}

export default function CheckoutComp() {
    const { items, updateQuantity, total, clearCart } = useCart()
    const [customerDetails, setCustomerDetails] = useState({
        email: '',
        phone: '',
        name: '',
        surname: '',
        country: '',
        address: '',
        city: '',
        region: '',
        postalCode: '',
    })
    const [packetaPoint, setPacketaPoint] = useState('')
    const [isPending, startTransition] = useTransition();
    useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://widget.packeta.com/v6/www/js/library.js'
        script.async = true
        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [])
    async function handleCreateOrder(formData: FormData) {
        startTransition(async () => {
            await createOrder(formData, items.length);
            clearCart();
        })
    }
    const handleCustomerDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerDetails(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const showPacketaWidget = () => {
        if (window.Packeta) {
            const packetaApiKey = process.env.PACKETA_API_KEY;
            const packetaOptions = {
                packetConsignment: "true",
                livePickupPoint: "true",
                valueFormat: "\"Packeta\",id,carrierId,carrierPickupPointId,name,city,street",
                view: "modal"
            }

            window.Packeta.Widget.pick(packetaApiKey, (point: any) => {
                if (point) {
                    setPacketaPoint(`Address: ${point.formatedValue}`)
                }
            }, packetaOptions)
        }
    }

    return (
        <form className="container mx-auto px-4 py-8" action={handleCreateOrder}>
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    {items.map((item, idx: number) => (
                        <div key={item.id} className="flex items-center justify-between mb-4 p-4 border rounded">
                            <div className="flex-1">
                                <Input type="text" name={`product${idx}`} value={item.name} readOnly className="mb-2" disabled={isPending} />
                                <div className="grid grid-cols-3 gap-2">
                                    <Input type="text" name={`size${idx}`} value={item.size} readOnly disabled={isPending} />
                                    <Input type="text" name={`terpens${idx}`} value={item.terpens} readOnly disabled={isPending} />
                                    <Input type="text" name={`price${idx}`} value={`${item.price}`} readOnly disabled={isPending} />
                                </div>
                            </div>
                            <Input
                                type="number"
                                value={item.quantity}
                                name={`quan${idx}`}
                                onChange={(e) => updateQuantity(item.terpens, item.size, parseInt(e.target.value))}
                                className="w-20 ml-4"
                                min="1"
                                disabled={isPending}
                            />
                        </div>
                    ))}
                    <div className="text-xl font-semibold mt-4">Total: {total} Kč</div>
                </div>

                <div className='bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-5'>
                    <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="phone">Telefonní číslo</Label>
                            <Input id="phone" name="phone" type="tel" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="name">Jméno</Label>
                            <Input id="name" name="name" type="text" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="surname">Přijmení</Label>
                            <Input id="surname" name="surname" type="text" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="country">Země</Label>
                            <Input id="country" name="country" type="text" required defaultValue='Česká republika' readOnly />
                        </div>
                        <div>
                            <Label htmlFor="address">Adresa i s číslem popisným</Label>
                            <Input id="address" name="address" type="text" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="city">Obec</Label>
                            <Input id="city" name="city" type="text" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="region">Kraj</Label>
                            <Input id="region" name="region" type="text" required onChange={handleCustomerDetailsChange} />
                        </div>
                        <div>
                            <Label htmlFor="postalCode">PSČ</Label>
                            <Input id="postalCode" name="postalCode" type="text" required onChange={handleCustomerDetailsChange} />
                            <Input id="total" name="total" type="hidden" defaultValue={total} required onChange={handleCustomerDetailsChange} />
                        </div>
                    </div>
                </div>
            </div>



            <div className="mt-8">

                <div className="grid md:grid-cols-2 gap-8">
                    <div >
                        <h2 className="text-2xl font-semibold mb-4">Doprava</h2>
                        <div className="mt-4">
                            <Button onClick={showPacketaWidget}>Vyberte Zásilkovnu</Button>
                            <div className="mt-2">{packetaPoint}</div>
                        </div>
                    </div>
                    <div className='bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-5'>
                        <h2 className="text-2xl font-semibold mb-4">Platba</h2>
                        <h3 className="text-xl font-semibold mb-2">Bankovním převodem</h3>
                        <p>Account Number: 123-7895890287/8000</p>
                        <p>Bank: Example Bank</p>
                        <p>IBAN: CZ1234567890123456789012</p>
                        <hr className='h-0.5 bg-muted my-3' />
                        <h3 className="text-xl font-semibold mb-2">QR Platba</h3>
                        <Image
                            src={`https://api.paylibo.com/paylibo/generator/czech/image?accountPrefix=123&accountNumber=7895890287&bankCode=0100&amount=${total}&currency=CZK`}
                            alt="QR platba"
                            width={200}
                            height={200}
                        />
                    </div>

                </div>
            </div>

            <div className="mt-8">
                <Button size="lg" type="submit" className="w-full">{isPending ? <Loader2 className='animate-spin' /> : "Odeslat objednávku"}</Button>
            </div>
        </form>
    )
}