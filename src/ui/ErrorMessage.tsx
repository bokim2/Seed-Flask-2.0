import React from 'react'

export default function ErrorMessage({error}) {
  return (
    <div>ErrorMessage: error from react query error.  
        json.stringify(error): { JSON?.stringify(error)}
        error.toString(): {error?.toString()}
        error.message: {error?.message}
    </div>
  )
}
