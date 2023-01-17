const WORD_LENGTH = 5

export default function Line({ guess, isFinal, solution }) {
  const tiles = []

  for(let i = 0; i < WORD_LENGTH; i++){
    const char = guess[i]
    let className = 'tile'

    if(isFinal){
      if(char === solution[i]){
        className += ' correct'
      } else if(solution.includes(char)){
        className += ' close'
      } else {
        className += ' incorrect'
      }
    }

    tiles.push(
      <div className={className} key={i}>
        {char}
      </div>
    )
  }

  return (
    <div className="line">
      {tiles}
    </div>
  )
}