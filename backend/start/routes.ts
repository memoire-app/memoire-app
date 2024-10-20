/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const DashboardStatsController = () => import('#controllers/dashboard_stats_controller')
const RevisionsController = () => import('#controllers/revisions_controller')
const RevisionsFlashcardsController = () => import('#controllers/revisions_flashcards_controller')
const DecksController = () => import('#controllers/decks_controller')
const UsersController = () => import('#controllers/users_controller')
const FlashcardsController = () => import('#controllers/flashcards_controller')
const AdminController = () => import('#controllers/admin_controller')

router
  .group(() => {
    router.group(() => {
      router.get('/:provider/redirect', [UsersController, 'redirect'])
      router.get('/:provider/callback', [UsersController, 'handleCallback'])
      router.get('/me', [UsersController, 'me']).use(middleware.auth())
      router.get('/logout', [UsersController, 'logout'])
      router.post('/register', [UsersController, 'register'])
      router.post('/login', [UsersController, 'login'])
    })

    router.patch('/profile', [UsersController, 'update']).use(middleware.auth())

    router.get('/decks', [DecksController, 'getAll']).use(middleware.auth())
    router.post('/decks', [DecksController, 'create']).use(middleware.auth())
    router
      .post('/decks/:code/import', [DecksController, 'importDeckFromCode'])
      .use(middleware.auth())
    router.patch('/decks/:code/privatize', [DecksController, 'privatize']).use(middleware.auth())
    router.patch('/decks/:code/publicize', [DecksController, 'publicize']).use(middleware.auth())
    router.post('/decks/:code/duplicate', [DecksController, 'duplicate']).use(middleware.auth())

    router.patch('/decks/:code', [DecksController, 'editDeck']).use(middleware.auth())

    router.get('/decks/:code', [FlashcardsController, 'getByDeckCode']).use(middleware.auth())

    router.post('/decks/:code', [FlashcardsController, 'create']).use(middleware.auth())
    router.delete('/decks/:code', [DecksController, 'delete']).use(middleware.auth())

    router.patch('/flashcards/:id', [FlashcardsController, 'update']).use(middleware.auth())
    router.delete('/flashcards/:id', [FlashcardsController, 'delete']).use(middleware.auth())

    router.post('/decks/:code/revisions', [RevisionsController, 'create']).use(middleware.auth())
    router
      .get('/decks/:code/revisions/current', [RevisionsController, 'getCurrent'])
      .use(middleware.auth())

    router
      .post('/revisions/:revisionId/flashcards/:flashcardId', [
        RevisionsFlashcardsController,
        'create',
      ])
      .use(middleware.auth())

    router.get('/stats', [DashboardStatsController, 'getAll']).use(middleware.auth())
  })
  .prefix('/api')

router
  .group(() => {
    router.get('/decks', [AdminController, 'getAllDecks'])
  })
  .use(middleware.admin())
  .prefix('/admin')
