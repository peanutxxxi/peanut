'use client'
import * as Phaser from 'phaser'

export default class Example extends Phaser.Scene {
	private sprite!: Phaser.GameObjects.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private speed = 50 // 移动速度
	private moving = false

	constructor() {
		super({ key: 'MyPhaserScene' })
	}

	preload() {
		this.load.path = '/map'
		this.load.image('grass', '/land.png')
		this.load.aseprite('paladin', '/paladin.png', '/paladin.json')
	}

	create() {
		this.createBackground()

		const tags = this.anims.createFromAseprite('paladin')
		this.sprite = this.add.sprite(827, 415, 'paladin').setDisplaySize(20, 20).play({ key: 'step', repeat: -1 }).setScale(1)

		this.input.on('gameobjectover', (pointer: any, obj: any) => {
			obj.setColor('#ff00ff')
		})

		this.input.on('gameobjectout', (pointer: any, obj: any) => {
			obj.setColor('#00ff00')
		})

		this.cursors = this.input.keyboard!.createCursorKeys()

		// 创建控制按钮
		this.createButton(700, 780, 'left', () => this.moveLeft())
		this.createButton(800, 780, 'right', () => this.moveRight())
		this.createButton(750, 730, 'up', () => this.moveUp())
		this.createButton(750, 830, 'down', () => this.moveDown())
	}

	update() {}

	createBackground() {
		const tileSize = 50
		const rows = 10
		const cols = 50
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				this.add.image(x * tileSize, y * tileSize, 'grass').setOrigin(0)
			}
		}
	}

	createButton(x: number, y: number, label: string, callback: () => void) {
		const button = this.add
			.text(x, y, label, { fontSize: '32px', backgroundColor: '#000', color: '#fff' })
			.setInteractive()
			.on('pointerdown', callback)
			.setOrigin(0.5)
			.setColor('#00ff00')
	}

	moveLeft() {
		this.moving = true
		this.sprite.anims.play('SHit', true)
		this.sprite.x -= this.speed
	}

	moveRight() {
		this.moving = true
		this.sprite.anims.play('step', true)
		this.sprite.x += this.speed
	}

	moveUp() {
		this.moving = true
		this.sprite.anims.play('Delay', true)
		this.sprite.y -= this.speed
	}

	moveDown() {
		this.moving = true
		this.sprite.anims.play('release', true)
		this.sprite.y += this.speed
	}
}
