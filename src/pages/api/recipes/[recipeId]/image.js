import { getSession } from 'next-auth/client';
import cloudinary from 'cloudinary';
import formidable from 'formidable';

import Recipe from '@/backend/models/recipe';

const handler = async (req, res) => {
  const {
    method,
    query: { recipeId },
  } = req;
  const session = await getSession({ req });

  switch (method) {
    case 'PATCH':
      try {
        if (!session) {
          res
            .status(401)
            .send('You are unauthorized to access the requested resource. Please log in.');
        }

        const recipe = await Recipe.findById(recipeId);

        if (session.user._id !== recipe.author?._id) {
          res.status(403).send('Your account is not authorized to access the requested resource.');
        }

        if (session.user._id === recipe.author?._id) {
          const form = formidable({ keepExtensions: true, maxFileSize: 5 * 1024 * 1024 });

          const formFiles = await new Promise((resolve, reject) => {
            form.parse(req, (parseError, fields, files) => {
              if (parseError) {
                reject(parseError);
                return res
                  .status(400)
                  .json({ message: 'There was an error uploading image', error: parseError });
              }

              return resolve(files);
            });
          });

          const uploadResult = await cloudinary.v2.uploader.upload(
            formFiles.image.path,
            {
              folder: 'cook-me-pls',
              public_id: recipeId,
              width: 640,
              crop: 'scale',
            },
            async (uploadError, result) => {
              if (uploadError) {
                return res
                  .status(400)
                  .json({ message: 'There was an error uploading image', error: uploadError });
              }
              return result;
            }
          );

          const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId,
            { imageUrl: uploadResult.url },
            {
              new: true,
            }
          );

          res.status(200).json(updatedRecipe);
        }
      } catch (error) {
        res.status(500).json(error);
      }
      break;

    default:
      res.status(405).json('This method type is not currently supported.');
      break;
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
