// to Start the program enter "npm run medEx"
//Note: this is a console app

const prompt = require('prompt')

prompt.start()

//sorts a number in ascending order
const sort = (num) =>{
let numToSort = num.toString().split("")
return parseInt(numToSort.sort((a,b)=>a-b).join(""))
}

//checks if number is in range from 1 - 10^18
//compares & decrements number if sorted number doesn't match current number
const findAscendingNum = (num) => {
  if(num<1 || num > Math.pow(10, 18)){
    return "number not in range"
  }
  const sortedNum = sort(num)
  if(num === sortedNum){
    return num
  } else {
    return findAscendingNum(num-1)
  }
}

prompt.get(["input"], function(err,result){
  if(err) {return onError(err)}
  const initialNum = parseInt(result.input)
  const sortedNum = sort(initialNum)
  //checks if initial number is already in ascending order
  const numResult = initialNum === sortedNum ? initialNum : findAscendingNum(initialNum-1);
  console.log(numResult);
})
