import * as usersController from "../controllers/users-controller.js"
import { Router } from 'express'

const router = Router()
export {router}

router.get("/:id", usersController.show)
router.get("/:id/edit", usersController.edit)
router.put("/:id", usersController.update)