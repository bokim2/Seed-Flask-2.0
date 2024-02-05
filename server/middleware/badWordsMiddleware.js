import BadWordsFilter from 'bad-words';
const filter = new BadWordsFilter();

const badWordsMiddleware = (req, res, next) => {
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
};

export { badWordsMiddleware };
