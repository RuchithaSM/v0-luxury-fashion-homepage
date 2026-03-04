'use client'

import { Suspense } from "react"
import ShopPageContent from "./ShopPageContent"

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  )
}