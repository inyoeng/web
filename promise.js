'use Strict';

//promise는 js에서 사용되는 비동기적 오퍼레이션 (콜백 대신 쓸 수 있다.)
//state : pending => fulfiled or rejected
//producer vs consuner

//1. Producer
//새로운 프로미스가 만들어 질 때는, 우리가 전달한executer가 자동으로 실행된다.  
const promise = new Promise((resolve, reject)=> {
    //doing some heavy work -> 비동기적 처리가 좋당..(network, read files)
    console.log('doing something....');
    setTimeout(()=>{
        //resolve('ellie');
        reject(new Error('no Nerwork'))
    }, 2000)
});

//2. Consumers: then, catch, finally
promise.then((value)=>{
    console.log(value)
}) //프로미스가 정상 실행 되면 value
    .catch(error => {
        console.log(error);
    }) //실패한 경우~

    .finally(()=> {
        console.log('finally');
    }); //성공 실패 관계없이 항상~

//3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(()=> resolve(1), 1000)
});

fetchNumber
    .then(num => num * 2)
    .then(num => num * 3)
    .then(num => {
        return new Promise((resolve, reject) =>{
            setTimeout(()=> resolve(num -1), 1000)
        });
    })
    .then(num => console.log(num));