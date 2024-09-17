import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }
  })
  .build()
