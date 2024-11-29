import express from 'express'
import { deleteStudent, getSingleStudent, getStudents } from './student.controller'

const router = express.Router()
// checking issues
router.get('/', getStudents)
router.get("/:id", getSingleStudent)
router.delete("/:id", deleteStudent)

export const studentRoute = router
