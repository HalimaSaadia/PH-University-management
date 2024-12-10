import express from 'express'
import { deleteStudent, getSingleStudent, getStudents } from './student.controller'

const router = express.Router()
router.get('/', getStudents)
router.get("/:id", getSingleStudent)
router.patch("/:id", getSingleStudent)
router.delete("/:id", deleteStudent)

export const studentRoute = router
