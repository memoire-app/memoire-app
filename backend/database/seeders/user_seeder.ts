import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany(
      Array.from({ length: 5 }, () => ({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        avatar: faker.image.avatar(),
      }))
    )
  }
}
