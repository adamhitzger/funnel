'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Loader2, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addNewsletter, createBasket } from '@/lib/actions'
import { useCart } from '@/lib/card'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/email'
import { toast } from 'react-hot-toast';

type Size = "0.5g" | "1g" | "3g";
type Terpens = "ak47" | "amnesia" | "kush";
type SizePricing = {
  [key in Size]: number
}
type FormState = {
  terpens: Terpens;
  size: Size;
  quantity: number;
}

export function Funnel() {
  const icons = [
    {
      icon: "instagram",
      link: "https://www.instagram.com/hydroocann_official/"
    },
    {
      icon: "facebook",
      link: "https://www.facebook.com/Hydroocann/"
    },
    {
      icon: "email",
      link: "mailto:info@hydroocann.com"
    },
  ]

  const sizePricing: SizePricing = {
    "0.5g": 499,
    "1g": 799,
    "3g": 1299
  }
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [currentImage, setCurrentImage] = useState<number>(0)
  const [form, setForm] = useState<FormState>({
    terpens: "kush",
    size: "0.5g",
    quantity: 1,
  });
  const [email, setEmail] = useState({
    email: "",
  });
  const images = [
    '/images/crumble.jpg',
    '/images/crumble2.jpg',
    '/images/crumble3.jpg',
    '/images/crumble4.jpg',
    '/images/crumble5.jpg'
  ];
  const handleSizeChange = (size: Size) => {
    setForm(prevForm => ({ ...prevForm, size }));
  }

  const handleTerpensChange = (terpens: Terpens) => {
    setForm(prevForm => ({ ...prevForm, terpens }));
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10);
    setForm(prevForm => ({ ...prevForm, quantity }));
  }

  async function handleCreate(formData: FormData) {
    startTransition(async () => {
      const data = await createBasket(formData);
      addItem({
        id: "cc-r-1",
        name: "CBD Crumble resin",
        price: sizePricing[form.size],
        size: data.size,
        terpens: data.terpens,
        quantity: data.quantity,
      })
    })
  }
  async function handleNewslleter(formData: FormData) {
    startTransition(async () => {
      const error = await addNewsletter(formData);
      setEmail({ email: "" });
      if (error.errorMessage) {
        toast.error("něco se nepovedlo.");
      } else {
        toast.success("Vše proběhlo v pořádku.");
      }
    })
  }
  return (

    <>
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
                <Label htmlFor="terpens">Terpeny:</Label>
                <RadioGroup name='terpens' id="terpens" defaultValue={form.terpens} className="flex space-x-2" onValueChange={handleTerpensChange as (value: string) => void}
                  disabled={isPending}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ak47" id="ak47" />
                    <Label htmlFor="ak47">AK-47</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="amnesia" id="amnesia" />
                    <Label htmlFor="amnesia">Amnesia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kush" id="kush" />
                    <Label htmlFor="kush">Og-Kush</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="size">Objem:</Label>
                <Select name='size' defaultValue={form.size} disabled={isPending} onValueChange={handleSizeChange as (value: string) => void}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5g">0.5g</SelectItem>
                    <SelectItem value="1g">1g</SelectItem>
                    <SelectItem value="3g">3g</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input type="number" name="quantity" className="flex-grow" defaultValue={form.quantity} min={"1"} disabled={isPending} onChange={handleQuantityChange}
                />
              </div>
              <div className="flex items-center justify-between">

                <span className="text-2xl font-bold"><span className='line-through text-red-700 mx-2'>{sizePricing[form.size] + 150} Kč</span>{sizePricing[form.size]} Kč</span>
                <Button size="lg">
                  {isPending ? <Loader2 className='animate-spin' /> : <><ShoppingCart className="mr-2 h-4 w-4" />Zakoupit</>}

                </Button>
              </div>
            </form>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Varování</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Výrobek je určen pro další technické a laboratorní zpracování</li>
                <li>Výrobek není určen ke kouření ani jiné konzumaci</li>
                <li>Informace uvedené na této stránce není možné chápat jako odborné rady.</li>
                <li>Prodej osobám mladším 18 let je zakázán</li>
                <li>Více v <Link target='_blank' href={"https://www.hydroocann.com/prohlaseni-o-odpovednosti/"} className='underline'>prohlášení o odpovědnosti</Link></li>
              </ul>
            </div>
            <div className='flex flex-row space-x-4'>
              {icons.map((i, id) => (
                <SocialIcon url={i.link} key={id} network={i.icon} fgColor="#0A1a49" bgColor='#ffffff' />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 p-5">
          <h3 className="text-2xl font-bold mb-4">Buďte první kdo se dozví o novinkách a slevách!</h3>
          <form className="flex gap-4" action={handleNewslleter}>
            <Input type="email" name="email" placeholder="Zadejte email" defaultValue={email.email} className="flex-grow" disabled={isPending} />
            <Button type="submit">{isPending ? <Loader2 className='animate-spin' /> : "Odebírat"}</Button>
          </form>
        </div>
      </main>


    </>
  )
}