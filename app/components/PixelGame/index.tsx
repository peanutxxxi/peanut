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

	const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
		const scene = gameInstanceRef.current?.scene.getScene('MyPhaserScene') as MyPhaserScene
		switch (direction) {
			case 'up':
				scene.moveUp()
				break
			case 'down':
				scene.moveDown()
				break
			case 'left':
				scene.moveLeft()
				break
			case 'right':
				scene.moveRight()
				break
		}
	}

	return (
		<div className="flex items-center justify-center w-full h-full">
			<div id="phaser-game" ref={gameRef} />
			<div className="absolute opacity-0">
				<button id="up" onClick={() => handleMove('up')}>
					up
				</button>
				<button id="down" onClick={() => handleMove('down')}>
					down
				</button>
				<button id="left" onClick={() => handleMove('left')}>
					left
				</button>
				<button id="right" onClick={() => handleMove('right')}>
					right
				</button>
			</div>
		</div>
	)
}

export default PixelGame
