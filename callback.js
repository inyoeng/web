'use Strict';

//js는 동기적인 친구다!(순차적으로~)
//: execute the code block in order after hoisting.
// hoisting? : var, function declaration이 제일 위로 올라감. 


//비동기적
console.log('1');
setTimeout(function(){
    console.log('2');
}, 1000); //callback 나중에 다시 불러줘~
console.log('3');


//Synchronous callback
function printImmediately(print){
    print();
} //함수는 hoisting되어서 제일 위로 올라감!

printImmediately(()=> console.log('hello'));


//Asynchronous callback
function printWithDelay (print, timeout){
    setTimeout(print, timeout);
}

printWithDelay(() => console.log('async callback'), 2000)


//callback 지옥 예제

class UserStorage{
    loginUser(id, password, onSuccess, onError){
        setTimeout(()=>{
            if(
                (id === 'ellie' && password ==='dream')||
                (id === 'coder' && password ==='academy')
            ){
                onSuccess(id);
            }else{
                onError(new Error('not Found'))
            }
        }, 2000);
    }
    getRoles(user, onSuccess, onError){
        setTimeout(()=> {
            if(user ==='ellie'){
                onSuccess({name: 'ellie', role: 'admin'});
            }else{
                onError(new Error('no access'))
            }
            
        },1000);
    }
}

const UserStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your pw');
UserStorage.loginUser(
    id,
    password,
    user => {
        UserStorage.getRoles(
            user,
            userWithRole => {
                alert(`Hello ${userWithRole.name}, you have a ${useuserWithRoler.role} role`)
            },
            error =>{
                console.log(error);
            }
        );
    },
    error =>{
    console.error();
    }
);

//promise로-> callback-to-promise