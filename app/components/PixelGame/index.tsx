'use client'
import React, { useEffect, useRef } from 'react'
import * as Phaser from 'phaser'
import MyPhaserScene from './class/index'

const PixelGame: React.FC = () => {
	const gameRef = useRef<HTMLDivElement>(null)
	const gameInstanceRef = useRef<Phaser.Game | null>(null)

	useEffect(() => {
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			parent: 'phaser-game',
			width: 1600,
			height: 900,
			pixelArt: true,
			scene: MyPhaserScene,
		}

		if (gameRef.current) {
			gameInstanceRef.current = new Phaser.Game(config)
		}

		return () => {
			if (gameInstanceRef.current) {
				gameInstanceRef.current.destroy(true)
			}
		}
	}, [])

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div id="phaser-game" ref={gameRef} />
		</div>
	)
}

export default PixelGame
