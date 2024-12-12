import express from 'express';
import { validateRequest } from '../../utils/validateRequest';

import { createAcademicDepartment, getAllAcademicDepartments, getSingleAcademicDepartment, updateAcademicDepartment } from './academicDepartment.controller';
import { createAcademicDepartmentValidationSchema, updateAcademicDepartmentValidationSchema } from './academicDepartment.validation';



const router = express.Router();

router.post(
  '/create-academic-department',
  // validateRequest(
  //   createAcademicDepartmentValidationSchema,
  // ),
  createAcademicDepartment,
);

router.get('/', getAllAcademicDepartments);
router.get('/:departmentId',getSingleAcademicDepartment);

router.patch(
  '/:departmentId',
  validateRequest(
    updateAcademicDepartmentValidationSchema,
  ),
  updateAcademicDepartment,
);


export const AcademicDepartmentRoutes = router;