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

  test('A user can change its username', async ({ assert }) => {
    const user = await UserFactory.create()
    const newUsername = 'new_username'
    await user.merge({ username: newUsername }).save()
    assert.equal(user.username, newUsername)
  })

  test('Emails should be unique', async ({ assert }) => {
    const email = 'test@test.com'
    await UserFactory.merge({ email }).create()

    const users = await User.all()

    assert.equal(users.length, 2)

    // Try to create a user with the same email, this should raise an error
    try {
      await UserFactory.merge({ email }).create()
    } catch (error) {
      assert.exists(error)
    }
  })
})
