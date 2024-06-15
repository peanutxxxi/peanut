'use client'
import * as Phaser from 'phaser'

export default class Example extends Phaser.Scene {
	private sprite!: Phaser.GameObjects.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private speed = 50 // 移动速度
	private moving = false
	private bgContainer!: Phaser.GameObjects.Container

	constructor() {
		super({ key: 'MyPhaserScene' })
	}

	preload() {
		this.load.path = '/map'
		this.load.image('grass', '/land.png')
		this.load.aseprite('paladin', '/paladin.png', '/paladin.json')
	}

	create() {
		this.bgContainer = this.add.container(0, 0)
		this.createBackground()

		const tags = this.anims.createFromAseprite('paladin')
		this.sprite = this.add
			.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'paladin')
			.setDisplaySize(20, 20)
			.play({ key: 'step', repeat: -1 })
			.setScale(1)
			.setOrigin(0.5, 0.5)

		this.input.on('gameobjectover', (pointer: any, obj: any) => {
			obj.setColor('#ff00ff')
		})

		this.input.on('gameobjectout', (pointer: any, obj: any) => {
			obj.setColor('#00ff00')
		})

		this.cursors = this.input.keyboard!.createCursorKeys()
	}

	update() {
		this.sprite.anims.play('step', true)
	}

	createBackground() {
		const tileSize = 50
		const rows = 21
		const cols = 21

		const bgWidth = tileSize * cols
		const bgHeight = tileSize * rows

		const centerX = this.cameras.main.width / 2 - bgWidth / 2
		const centerY = this.cameras.main.height / 2 - bgHeight / 2

		let counter = 1

		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const tileX = centerX + x * tileSize
				const tileY = centerY + y * tileSize

				const tile = this.add.image(tileX, tileY, 'grass').setOrigin(0)
				this.bgContainer.add(tile)

				const text = this.add
					.text(tileX + tileSize / 2, tileY + tileSize / 2, String(counter), {
						fontSize: '10px',
						color: '#000',
						backgroundColor: 'rgba(255, 255, 255, 0.7)',
					})
					.setOrigin(0.5)
				this.bgContainer.add(text)

				counter++
			}
		}
	}

	handleMovement() {
		const { left, right, up, down } = this.cursors
		this.moving = false

		if (left.isDown) {
			this.bgContainer.x += this.speed
			this.moving = true
		}
		if (right.isDown) {
			this.bgContainer.x -= this.speed
			this.moving = true
		}
		if (up.isDown) {
			this.bgContainer.y += this.speed
			this.moving = true
		}
		if (down.isDown) {
			this.bgContainer.y -= this.speed
			this.moving = true
		}
	}

	moveLeft() {
		this.bgContainer.x += this.speed
		this.moving = true
	}

	moveRight() {
		this.bgContainer.x -= this.speed
		this.moving = true
	}

	moveUp() {
		this.bgContainer.y += this.speed
		this.moving = true
	}

	moveDown() {
		this.bgContainer.y -= this.speed
		this.moving = true
	}

	createButton(x: number, y: number, label: string, callback: () => void) {
		const button = this.add
			.text(x, y, label, { fontSize: '32px', backgroundColor: '#000', color: '#fff' })
			.setInteractive()
			.on('pointerdown', callback)
			.setOrigin(0.5)
			.setColor('#00ff00')
	}
}
