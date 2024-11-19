const express=require('express')
const router=express.Router()
const first_controller=require('../controllers/first_controllers')

router.post('/second_create',first_controller.first_controller_create);
router.get('/second_read',first_controller.first_controller_read);
router.post('/second_update',first_controller.first_controller_update);
router.post('/delete_record',first_controller.first_controller_delete);

router.get('/fr_read',first_controller.fr_read);

module.exports=router;