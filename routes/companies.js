import { Router } from 'express'
import * as companiesController from "../controllers/companies-controller.js"
export {
  router
}

const router = Router()
router.get('/', companiesController.index)
router.get('/new', companiesController.new)
router.get("/:id", companiesController.show)
router.get("/:id/edit", companiesController.edit)
router.post("/", companiesController.create)
router.put("/:id", companiesController.update)
router.delete(":/id", companiesController.delete)