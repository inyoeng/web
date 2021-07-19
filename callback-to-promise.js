//callback 지옥 예제

class UserStorage{
    loginUser(id, password){
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if(
                    (id === 'ellie' && password ==='dream')||
                    (id === 'coder' && password ==='academy')
                ){
                    resolve(id);
                }else{
                    reject(new Error('not Found'))
                }
            }, 2000); 
        })
       
    }
    getRoles(user){
        return new Promise((resolve, reject) =>{
        setTimeout(()=> {
            if(user ==='ellie'){
                resolve({name: 'ellie', role: 'admin'});
            }else{
                reject(new Error('no access'))
            }
            
        },1000);
    });
}
}


const UserStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your pw');

UserStorage
.loginUser(id, password)
.then(UserStorage. getRoles)
.then(user => alert(`Hello ${userWithRole.name}, you have a ${useuserWithRoler.role} role`))
.catch(console.log);

