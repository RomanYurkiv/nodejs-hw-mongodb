import createHttpError from 'http-errors';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorDetails = error.details.map(detail => detail.message).join(', ');
      next(createHttpError(400, `Validation error: ${errorDetails}`));
    } else {
      next();
    }
  };
};