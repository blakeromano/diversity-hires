import * as usersController from "../controllers/users-controller.js"
import { Router } from 'express'

const router = Router()
export {router}

router.get("/:id", usersController.show)
router.get("/:id/edit", usersController.edit)
router.put("/:id", usersController.update)
router.post("/:id/skills", usersController.newSkill)
router.post("/:id/education", usersController.newEducation)
router.post("/:id/experience", usersController.newExperience)