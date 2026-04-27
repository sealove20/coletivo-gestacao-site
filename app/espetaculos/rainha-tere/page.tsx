import type { Metadata } from 'next'
import RainhaTerePage from '@/components/RainhaTerePage'

export const metadata: Metadata = {
  title: 'Festival de Teatro Rainha Terê — Coletivo Gestação',
  description: 'Festival de teatro negro em Rondonópolis/MT, organizado pelo Coletivo Gestação. Edições 2024 e 2025.',
  openGraph: {
    title: 'Festival de Teatro Rainha Terê — Coletivo Gestação',
    type: 'website',
  },
}

export default function Page() {
  return <RainhaTerePage />
}
