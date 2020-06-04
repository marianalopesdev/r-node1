import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import UpdateAvatarUserService from '../services/UpdateUserAvatarService';

const usersRouters = Router();
const upload = multer(uploadConfig);

usersRouters.post('/', async (request, response) => {
  
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
  
});

usersRouters.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        // console.log(request.file);
       
            const updateUserAvatar = new UpdateAvatarUserService();
            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            delete user.password;
            return response.json(user);
      
    },
);

export default usersRouters;
