'use client'
import * as Phaser from 'phaser'

export default class Example extends Phaser.Scene {
	private sprite!: Phaser.GameObjects.Sprite
	private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
	private speed = 5 // 移动速度
	private moving = false
	constructor() {
		super({ key: 'MyPhaserScene' })
	}

	preload() {
		this.load.path = '/map'
		this.load.image('map', '/map.jpg')
		this.load.aseprite('paladin', '/paladin.png', '/paladin.json')
	}

	create() {
		this.add.image(800, 450, 'map')

		const tags = this.anims.createFromAseprite('paladin')
		this.sprite = this.add.sprite(800, 400, 'paladin').setDisplaySize(20, 20).play({ key: 'step', repeat: -1 }).setScale(2)

		// for (let i = 0; i < tags.length; i++) {
		// 	const label = this.add.text(32, 32 + i * 16, tags[i].key, { color: '#00ff00' })

		// 	label.setInteractive()
		// 	label.setPosition(200, 100 + i * 20) // 设置位置
		// }

		// this.input.on('gameobjectdown', (pointer: any, obj: any) => {
		// 	this.sprite.play({
		// 		key: obj.text,
		// 		repeat: -1,
		// 	})
		// })

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

	update() {
		this.moving = false

		if (this.cursors.left.isDown) {
			this.moveLeft()
		} else if (this.cursors.right.isDown) {
			this.moveRight()
		}

		if (this.cursors.up.isDown) {
			this.moveUp()
		} else if (this.cursors.down.isDown) {
			this.moveDown()
		}

		if (!this.moving) {
			this.sprite.anims.play('step', true)
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
