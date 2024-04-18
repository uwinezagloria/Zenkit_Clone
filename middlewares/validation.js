import {body} from "express-validator";
const validateUser=[
    body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage("task name is required")
    .isLength({min:5})
    .withMessage("name must have atleast 5")
]
export default validateUser