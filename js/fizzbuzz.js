module.exports.init = function(){
    var count = 0;
    var value = 1;
    while(count < 100){
        if(value % 3 === 0 && value % 5 === 0){
            console.log(value + " Fizz Buzz " + (count+1));
            count++;
        }else if(value % 3 === 0){
            console.log(value + " Fizz " + (count+1));
            count++;
        }else if(value % 5 === 0){
            console.log(value + " Buzz " + (count+1));
            count++;
        }else{
            //Do Nothing
        }
        value++;
    }
};