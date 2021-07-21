import * as profilesController from "../controllers/profiles-controller.js"
import { Router } from 'express'

const router = Router()
export {router}

router.get("/", profilesController.index)
router.get("/:id", profilesController.show)
router.get("/:id/edit", profilesController.edit)
router.put("/:id", profilesController.update)
router.post("/:id/skills", profilesController.newSkill)
router.post("/:id/education", profilesController.newEducation)
router.post("/:id/experiences", profilesController.newExperience)
router.delete("/:id/skills/:id", profilesController.deleteSkill)
router.delete("/:id/education/:id", profilesController.deleteEducation)
router.delete("/:id/experiences/:id", profilesController.deleteExperience)