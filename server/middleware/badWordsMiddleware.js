import BadWordsFilter from 'bad-words';
const filter = new BadWordsFilter();

const badWordsMiddleware = (req, res, next) => {
 try {
  let profanityDetected = false;
  let problemValue = '';

  for (let [key, value] of Object.entries(req.body)) {
    if (typeof value === 'string' && filter.isProfane(value)) {
      profanityDetected = true;
      problemValue = value;
      console.log('Profanity detected in:', key);
      break; // Exit the loop early since we found profanity
    }
  }

  if (profanityDetected) {
    const err = new Error(`Profanity is not allowed: ${problemValue}`);
    err.status = 400;
    return next(err);
  } else {
    next();
  }
} catch (err) {
  console.error(err);
  // res.status(500).json({ message: err?.message || err?.detail || 'Internal server error' });  
      // Forward the error to centralized error handling middleware
      return next(err);
}
};

export { badWordsMiddleware };
