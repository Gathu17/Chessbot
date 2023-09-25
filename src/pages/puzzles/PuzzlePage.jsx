import React from 'react'
import PuzzleSettings from './PuzzleSettings'
import Puzzles from './Puzzles'

const PuzzlePage = () => {
  return (
    <>
<div className='flex items-center justify-evenly'>
    <Puzzles />
    <PuzzleSettings />
</div>
    </>
  )
}

export default PuzzlePage