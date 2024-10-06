'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBasket } from '@/lib/actions'
export function Funnel() {
  const [isPending, startTransition] = useTransition();
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [form, setForm] = useState({
    terpens: "silver",
    size: "halfg",
    quantity: 1,
  })
  const images = [
    '/images/crumble.jpg',
    '/images/crumble2.jpg',
    '/images/crumble3.jpg',
    '/images/crumble4.jpg',
    '/images/crumble5.jpg'
  ]
  async function handleCreate(formData: FormData) {
    startTransition(async () => {
      await createBasket(formData);
    })
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className=" text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Amazing Product</h1>
        </div>
      </header>

      <main className=" flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative aspect-square w-full">
              <Image
                src={images[currentImage]}
                alt={`Product image ${currentImage + 1}`}
                layout="fill"
                className="rounded-lg object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images.map((src, index) => (
                <button
                  key={index}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${index === currentImage ? 'ring-2 ring-primary' : ''
                    }`}
                  onClick={() => setCurrentImage(index)}
                >
                  <Image
                    src={src}
                    alt={`Product thumbnail ${index + 1}`}
                    layout="fill"
                    className='object-cover '
                  />
                </button>
              ))}
            </div>
          </div>


          <div className="space-y-6 p-5 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30">
            <div>
              <h2 className="text-3xl font-bold mb-2">CBD Crumble resin</h2>
              <p className="text-muted-foreground">
                Experience the future of widgets with our Premium Widget 3000. This cutting-edge device combines
                sleek design with unparalleled functionality, making it the perfect addition to your modern lifestyle.
                Crafted with precision and care, the Widget 3000 boasts advanced features that streamline your daily tasks
                and enhance productivity. Its intuitive interface and customizable settings ensure a personalized experience
                tailored to your unique needs.
              </p>
            </div>

            <form className="space-y-4" action={handleCreate}>
              <div>
                <Label htmlFor="color">Color</Label>
                <RadioGroup name='terpens' id="color" defaultValue={form.terpens} className="flex space-x-2" disabled={isPending}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="silver" id="silver" />
                    <Label htmlFor="silver">Silver</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="black" id="black" />
                    <Label htmlFor="black">Black</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gold" id="gold" />
                    <Label htmlFor="gold">Gold</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="size">Size</Label>
                <Select name='size' defaultValue={form.size} disabled={isPending}>
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="halfg">0.5g</SelectItem>
                    <SelectItem value="1g">1g</SelectItem>
                    <SelectItem value="3g">3g</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input type="number" name="quantity" className="flex-grow" defaultValue={form.quantity} min={"1"} disabled={isPending} />
              </div>
              <div className="flex items-center justify-between">

                <span className="text-2xl font-bold">$299.99</span>
                <Button size="lg">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </form>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Advanced AI-powered functionality</li>
                <li>Seamless integration with smart home devices</li>
                <li>Long-lasting battery life up to 72 hours</li>
                <li>Water-resistant and durable design</li>
                <li>Customizable interface with multiple themes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-5">
          <h3 className="text-2xl font-bold mb-4">Buďte první kdo se dozví o novinkách a slevách!</h3>
          <form className="flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-grow" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2023 Amazing Product. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}