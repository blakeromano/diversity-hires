import { Router } from 'express'
import * as indexController from "../controllers/index-controllers.js"
export {
  router
}

const router = Router()
router.get('/', indexController.index)
router.get('/about', indexController.about)