import React, { useEffect, useState } from 'react'
import Line from './Line'

const API_URL = 'https://random-words5.p.rapidapi.com/getMultipleRandom?count=20&wordLength=5'

export default function WordlePlayGround() {
  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    if(guesses.findIndex((val) => val == null) === -1){
      setIsGameOver(true)
    }

    const handleType = (e) => {
      if (isGameOver) {
        return
      }

      if (e.key === 'Enter') {
        if (currentGuess.length !== 5) {
          return
        }

        const newGuesses = [...guesses]
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess
        
        setGuesses(newGuesses)
        setCurrentGuess('')

        if (solution === currentGuess) {
          setIsGameOver(true)
        }
      }      

      if (e.key === 'Backspace') {
        setCurrentGuess(currentGuess.slice(0, -1))
        return
      }

      if (currentGuess.length >= 5) {
        return
      }

      const isLetter = e.key.match(/^[a-z]{1}$/) != null

      if (isLetter) {
        setCurrentGuess((prev) => prev + e.key)
      }
    }

    window.addEventListener('keydown', handleType)
    return () => window.removeEventListener('keydown', handleType)
  }, [currentGuess, isGameOver, solution, guesses])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '70bf61380fmsh4bcbae36f10f912p1a310ejsna28f46e08529',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    }

    const fetchWord = async () => {
      const response = await fetch(API_URL, options)
      const words = await response.json()
      const randomWord = words[Math.floor(Math.random() * words.length)]
      setSolution(randomWord)
    }

    fetchWord()
  }, [])
 
  return (
    <div className='board'>
      <div className='answer'>
        {isGameOver && 
          solution.split('').map((char, i) => {
            return (
              <div className='tile' key={i}>{char}</div>
            )
          })
        }</div>
      <div className='guesses'>
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val == null)
          return (
            <Line
              guess={isCurrentGuess ? currentGuess : guess ?? ''}
              isFinal={!isCurrentGuess && guess != null}
              solution={solution}
              key={i}
            />
          )
        })}
      </div>
    </div>
  )
}