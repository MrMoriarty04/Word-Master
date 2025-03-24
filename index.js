const letters=document.querySelectorAll('.letter-field');
const loadingDiv=document.querySelector('.info-bar'); 
const MAX_WORD_LENGTH=5;


function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

async function init() {
    let currentGuess=``;
    let currentRow=0;

    const response=await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
    const responseObject= await response.json();
    const word = responseObject.word.toUpperCase();
    console.log(word);

        function letterInsert(letter){
            if(currentGuess.length<MAX_WORD_LENGTH)
                currentGuess+=letter;
            else
                currentGuess=currentGuess.substring(0,currentGuess.length-1)+letter;
            
        
            letters[(MAX_WORD_LENGTH*currentRow)+currentGuess.length-1].innerText=letter;
        }
        



        function submit(){
            if(currentGuess.length!== MAX_WORD_LENGTH)
                return ;
            
            currentRow++;
            currentGuess=``;
        }
        


        function backSpace(){
            currentGuess=currentGuess.substring(0,currentGuess.length-1);
            letters[(MAX_WORD_LENGTH*currentRow)+currentGuess.length].innerText="";
        }
    



    document.addEventListener('keydown',function handleKeyPress(event){
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


init();