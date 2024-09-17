import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import { test } from '@japa/runner'

test.group('Users connect', () => {
  test('Create new users', async ({ assert }) => {
    await UserFactory.createMany(5)
    const users = await User.all()
    assert.equal(users.length, 5)
  })

  test('Delete all users', async ({ assert }) => {
    await User.query().delete()
    const users = await User.all()
    assert.equal(users.length, 0)
  })
})
