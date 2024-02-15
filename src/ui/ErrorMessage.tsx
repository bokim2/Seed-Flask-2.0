import React from 'react';

export default function ErrorMessage( {error} ) {
  console.log('error object in ErrorMessage', error)
  return (
    <div>
      ErrorMessage: error from react query error.
      <p>json.stringify(error): {JSON?.stringify(error)}</p>
      <p>error.toString(): {error?.toString()}</p>
      <p> error.message: {error?.message}</p>
    </div>
  );
}
