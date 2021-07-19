//json
//jsavascript object Notation

//1. Object to JSON
//stringigy(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(['apple','banana']);
console.log(json);

const rabbit = {
    name='tori',
    color:'white',
    birthDate: new Date(),
    Symbol: Symbol('id'), //자바스크립트에만 있는 것도 안나온다.
    jump:() => {
        console.log(`${name} can jump!`);
    }//함수는 오브젝트의 데이터가 아니라서 json에 표현되지 않는다. 
};

json = JSON.stringify(rabbit);
console.log(json);

json = JSON.stringify(rabbit, ['name']); //원하는 property 만 할 수 있다. 
console.log(json);

json = JSON.stringify(rabbit, (key, value) =>{
    return key === 'name' ? 'ellie' :value;
})



//2. JSON to Object
//parse(json)

console.clear();
json = JSON.stringify(rabbit);
console.log(json);
const obj = JSON.parse(json);
console.log(obj);
rabbit.jump();//json에는 데이터만 넘어갔기 때문에.... obj.jump()하면 오류~

 console.log(rabbit.birthDate.getDate());
 console.log(obj.birthDate.getDate()); //오류! birthDate는 String이기 때문. 콜백함수 쓰자!

 const obj = JSON.parse(json,(key, value)=>{
    console.log(`key: ${key} , value:${value}`);
     return key === 'birthDate' ? new Date(value) : value;
 });

 console.log(obj.birthDate.getDate()); 