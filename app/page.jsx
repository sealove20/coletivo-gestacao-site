import HomePage from '@/components/HomePage'

export const metadata = {
  title: 'Coletivo Gestação — Teatro Negro | Rondonópolis MT',
  description: 'Coletivo Afroperspectivista de Teatro. Espetáculo Gestação de Cam — teatro negro, memória e ancestralidade. Rondonópolis, Mato Grosso.',
  openGraph: {
    title: 'Coletivo Gestação — Teatro Negro',
    description: 'Coletivo Afroperspectivista de Teatro. Espetáculo premiado Gestação de Cam.',
    type: 'website',
  },
}

export default function Page() {
  return <HomePage />
}
