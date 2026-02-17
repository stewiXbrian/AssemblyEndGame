import {useState} from 'react'
import getRandomWord from './words.js'
import './style.css'
import  {languages} from './languages.js'



export default function App(){
    
    const [currentWord,setCurrentWord]=useState('between')

    const alphabet ='ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    const [userGuess,setUserGuess]=useState([])

    const wrongGuessCount=userGuess.filter(c=>!currentWord.toUpperCase().includes(c)).length
    console.log(wrongGuessCount)

    const languageChips=languages.map((c,i)=>{
       const isLanguageLost= i<wrongGuessCount      
       return <span className={isLanguageLost?'lost':''} key={i} style={{backgroundColor:c.backgroundColor,color:c.color}}>
            {c.name}
        </span>
        })


    const wordCharacters=currentWord.toUpperCase().split('').map((c,i)=>(
       //while useGuess is empty at first render ,map returns empty array so nothing happen in first render
       wrongGuessCount===languages.length-1 ? <span key={i} style={ { color: !userGuess.includes(c) ? 'orange' : '' }} > {c} </span> :

                    <span key={i}>{userGuess.includes(c) ? c : ''} </span>
    ))


    const keyboardElements=alphabet.split('').map((c,i)=>{
        const isGuessed=userGuess.includes(c)
        const isCorrectGuess = isGuessed && currentWord.toUpperCase().includes(c) 
        const isWrongGuess=isGuessed && !currentWord.toUpperCase().includes(c)
        const buttonStyle = { backgroundColor: isCorrectGuess ? 'green' : (isWrongGuess?'red':'') };
        
      return(
       <button 
       key={i} 
       onClick={()=>handleClick(c)} 
       style={buttonStyle}
       disabled={wrongGuessCount===languages.length-1 || currentWord.toUpperCase().split('').every(c=>userGuess.includes(c))}>
        {c}
      </button>)
})

    
function handleClick(c){
        setUserGuess(prev=>[...prev,c])
          }
function startNewGame(){
    setCurrentWord(()=>getRandomWord())
    setUserGuess([])
}
    
    
    return (
        <main>
            <header>
                <h1>
                    Assembly: EndGame
                </h1>
                <p>
                    guess the word within the 8 attempts to keep the 
                    programming world safe from Assembly!
                     </p>

            </header>
            <section  >
                {
                   
                    
                    (
                        ()=>{
                            const farewellMessage = languages
                            .slice(0, wrongGuessCount)
                            .map(lang => lang.name)
                            .join(' & ');
                          return <span className='game-status' style={{ backgroundColor: '#6c127c77', padding: 'auto' }}> {farewellMessage ? `Farewell ${farewellMessage}` : ''}</span>;
                        }
                    ) ()
                    }
              {currentWord.toUpperCase().split('').every(c=>userGuess.includes(c))?
                     <div className='game-status' style={{backgroundColor:'#117e45'}}>
                        <h2>You Win!</h2>
                        <p>Well Done!</p>
                             </div> :null 
              } 

                {
                    wrongGuessCount===languages.length-1?
                    <div className='game-status' style={{backgroundColor:'#7e1611'}}>
                    <h2>You Loose!</h2>
                    <p>better start learning assembly</p>
                    </div> : null
                }
            </section>
            <section className='language-chips'>
                    {languageChips}
               </section>
               <section className='word'>
                {
                    wordCharacters
                }
               </section>
               <section className='keyboard'>
                 {keyboardElements}
               </section>
               <section className='new-game'>
                {
                    wrongGuessCount===languages.length-1 || currentWord.toUpperCase().split('').every(c=>userGuess.includes(c))?
                    <button onClick={()=>startNewGame()}>New Game</button>
                     : null
                }
               </section>
        </main>
    )
}
