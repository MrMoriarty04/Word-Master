const letters=document.querySelectorAll('.letter-field');
const loadingDiv=document.querySelector('.info-bar'); 
const MAX_WORD_LENGTH=5;
const Max_ROUND=6;

async function init() {
    let currentGuess=``;
    let currentRow=0;

    const response=await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
    const responseObject= await response.json();
    const word = responseObject.word.toUpperCase();
    const wordSplit=word.split("");
    let done = false;
    console.log(word);
    setLoading(false);

        function letterInsert(letter){
            if(currentGuess.length<MAX_WORD_LENGTH)
                currentGuess+=letter;
            else
                currentGuess=currentGuess.substring(0,currentGuess.length-1)+letter;
            
        
            letters[(MAX_WORD_LENGTH*currentRow)+currentGuess.length-1].innerText=letter;
        }
        

       async function submit(){
            if(currentGuess.length!== MAX_WORD_LENGTH)
                return ;

            setLoading(true);
            const validWord = await sendResponse(currentGuess);
            setLoading(false);

            if(!validWord){
                markInvalidWord();
                return ;
            }


            const guessSplit=currentGuess.split("");
            const map=makeMap(wordSplit);


            for(let i=0;i<MAX_WORD_LENGTH;i++){
                if(guessSplit[i]===wordSplit[i]){
                    letters[MAX_WORD_LENGTH*currentRow+i].classList.add("correct");
                    map[guessSplit[i]]--;

                }

            }
            if(currentGuess===word){
                alert("you won!!!");
                document.querySelector('.header').classList.add("winner");
                done=true;
                return;
            }



            for(let i=0;i<MAX_WORD_LENGTH;i++){
                if(guessSplit[i]===wordSplit[i])
                    continue;
                else if(wordSplit.includes(guessSplit[i]) && map[guessSplit[i]]>0){
                    letters[MAX_WORD_LENGTH*currentRow+i].classList.add("close");
                    map[guessSplit[i]]--;
                }
                else
                letters[MAX_WORD_LENGTH*currentRow+i].classList.add("wrong");
            }


            
            currentRow++;
            currentGuess=``;

            if(currentRow==Max_ROUND){
                alert(`you lose the word was ${word}`);
                done=true;
            } 
        }
        


        function backSpace(){
            currentGuess=currentGuess.substring(0,currentGuess.length-1);
            letters[(MAX_WORD_LENGTH*currentRow)+currentGuess.length].innerText="";
        }
    

        
        function markInvalidWord(){

            for(let i=0;i<MAX_WORD_LENGTH;i++){
                letters[MAX_WORD_LENGTH*currentRow+i].classList.remove("invalid");
                setTimeout(function(){
                    letters[MAX_WORD_LENGTH*currentRow+i].classList.add("invalid");
                },10);
            }


        }

    document.addEventListener('keydown',function handleKeyPress(event){
        
        if(!loadingDiv || done)
            return;

        const action = event.key;
        if(action === 'Enter'){
            submit();
        }
        else if(action === 'Backspace'){
            backSpace();
        }
        else if(isLetter(action)){
            letterInsert(action.toUpperCase());
        }
    });

}


function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

function setLoading(isLoading){

    loadingDiv.classList.toggle('hidden',!isLoading);

  }

  function makeMap(array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
      if (obj[array[i]]) {
        obj[array[i]]++;
      } else {
        obj[array[i]] = 1;
      }
    }
    return obj;
  }
  

  async function sendResponse(currentGuess){
    const sendResponse= await fetch ("https://words.dev-apis.com/validate-word",
        {   method: "POST",
            body: JSON.stringify({word:currentGuess}),
        });
    const resObj=await sendResponse.json();
    const validWord=resObj.validWord;
    
    return validWord;
  }

init();