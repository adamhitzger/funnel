'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function AgeBanner() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const hasAgreed = localStorage.getItem('ageVerified')
        if (!hasAgreed) {
            setIsVisible(true)
        }
    }, [])

    const handleAgree = () => {
        localStorage.setItem('ageVerified', 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Ověření věku</h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsVisible(false)}
                            aria-label="Close"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <p className="text-gray-700 mb-6">
                        Obsah na této stránce je určen pro osoby starší 18 let, Je Vám A8 a více let?
                    </p>
                    <div className="flex justify-end space-x-4">
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Ne, není mi 18
                        </Button>
                        <Button onClick={handleAgree}>
                            Ano, je mi více jak 18
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}