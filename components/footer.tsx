"use client";

import Link from 'next/link'
import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-muted py-6 mt-12">
            <div className="container flex flex-col lg:flex-row justify-between mx-auto px-4 text-center text-muted-foreground">
                <p>&copy; {year} Hydroocann s.r.o.</p>
                <p><Link href={"https://www.hydroocann.com/reklamacni-rad/"} target='_blank' className='underline'>Reklamační řád</Link>, <Link className='underline' href={"https://www.hydroocann.com/obchodni-podminky/"} target='_blank'>Obchodní podmínky</Link>, <Link className='underline' href={"https://www.hydroocann.com/podminky-ochrany-osobnich-udaju/"} target='_blank'>Ochrana os. údajů</Link></p>
                <p>Developed by <Link href={"https://www.linkedin.com/in/adam-hitzger-aa518622b/?originalSubdomain=cz"} className='underline' target='_blank'>Adam Hitzger</Link></p>
            </div>
        </footer>
    )
}

