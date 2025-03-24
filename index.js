
/**
 * if the user click on .bage he will be directed to last place he was in 
 * we have 6 row each row is seperated form the other row
 * in each row we have 5 div (column) and when they all fill in the letters we cant add more
 * we can use backspace to delete from the last and rewrite 
 * just the letters and backspace and enter are working 
 * if we press enter the word would supmited (we can press enter only when there are 5 letters)
 * when we press enter and the word submitted we will make a for loop to check for the letters 
 * if the letter is in his write palce div background will be green 
 * if the letter is in the word but not in his write place background will be yellow
 * if the letter not in the word backgrond well be gray
 * when i press enter it will go to the next line
 */

function init(){
    document.querySelector(".bage").addEventListener("click",function(event){
        alert("hi");
    })
}



init();