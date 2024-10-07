"use client";

import React from 'react'
import Basket from './basket'
import Image from 'next/image'
import Link from 'next/link';
export default function Header() {
    return (
        <header className=" text-primary-foreground py-4">

            <div className="container flex flex-row items-center justify-between mx-auto px-4">
                <Link href={"/"}>
                    <Image
                        width={200}
                        height={200}
                        src={"/images/logo.png"}
                        alt='Logo Hydroocann s.r.o.'
                    />
                </Link>
                <Basket />
            </div>
        </header>
    )
}

