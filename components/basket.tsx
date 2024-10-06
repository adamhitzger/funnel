import { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { useCart } from '@/lib/card'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Basket() {
    const { items, removeItem, updateQuantity, total, clearCart } = useCart()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <ShoppingCart className="h-6 w-6 text-black" />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {items.length}
                        </span>
                    )}
                    <span className="sr-only">Open cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                </SheetHeader>
                {items.length === 0 ? (
                    <p className="text-center text-muted-foreground mt-4">Your cart is empty</p>
                ) : (
                    <div className="mt-8 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between space-x-4">
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">{item.name} {item.terpens}</h3>
                                    <p className="text-sm text-muted-foreground">{item.size}</p>
                                    <p className="text-sm text-muted-foreground">{item.price.toFixed(2)} Kč</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                                        className="w-16"
                                    />
                                    <Button variant="outline" size="icon" onClick={() => removeItem(item.id)}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Odstranit</span>
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className="border-t pt-4">
                            <div className="flex justify-between">
                                <span className="font-medium">Total:</span>
                                <span className="font-medium">{total.toFixed(2)} Kč</span>
                            </div>
                        </div>
                        <div className="flex justify-between space-x-4">
                            <Button variant="outline" onClick={clearCart}>Vyčistit košík</Button>
                            <Button>Checkout</Button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}