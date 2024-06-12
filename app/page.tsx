import dynamic from 'next/dynamic'
const DynamicPixelGame = dynamic(() => import('./components/PixelGame'), { ssr: false })

export default function Page() {
	return <DynamicPixelGame />
}
