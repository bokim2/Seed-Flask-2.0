import React from 'react'

export default function CellbanksForm() {
  return (
    <>
    <form>
        <label htmlFor="strain">strain</label>
        <input  type="text" placeholder="strain name" required/>
        <input 
        type="text" placeholder="notes" required/>


    </form>
    
    </>
  )
}
