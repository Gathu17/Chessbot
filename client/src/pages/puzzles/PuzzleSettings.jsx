import React from 'react'


const PuzzleSettings = () => {
    const puzzles = [
        {
            id: 1,
            title: 'Puzzles',
            icon: 'https://picsum.photos/80/80',
            description: 'Train with more than 1000 puzzles'
        },
        {
            id: 2,
            title: 'Puzzle Rush',
            icon: 'https://picsum.photos/80/80',
            description: 'Race against the clock. 3 strikes and you are out'
        },
        {  
            id: 3,
            title: 'Puzzle Battle',
            icon: 'https://picsum.photos/80/80',
            description: 'Rush against another player to win'
        },
        {
            id: 3,
            title: 'Daily Puzzle',
            icon: 'https://picsum.photos/80/80',            
            description: "an you solve today's puzzle"
        },
        {
            id: 3,
            title: 'Custom',
            icon: 'https://picsum.photos/80/80',            
            description: 'Choose puzzles by theme and rating'
        },
    ]
  return (
    <>
    <div className="flex flex-col justify-center">
      {puzzles.map((p) => (
        <React.Fragment key={p.id}>
          <div className="flex items-center my-2">
            <img src={p.icon} alt="icon" className="w-10 h-10 mr-4" />
            <div className="flex flex-col ">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="text-sm">{p.description}</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
    
    </>
  )
}

export default PuzzleSettings