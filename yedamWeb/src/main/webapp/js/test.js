/**
 * 
 */
document.getElementById('btnDel').addEventListener('click',frm_delete1);

function frm_delete1(){
	console.log('delete');
	
}
let xhtp = new XMLHttpRequest();
xhtp.open("get", "empListServLet");
xhtp.send();
xhtp.onreadystatechange = function() {
	if (xhtp.readyState == 4 && xhtp.status == 200) {
		let data = JSON.parse(xhtp.responseText);
		console.log(data);
		createTable(data)
	}
	//console.log(xhtp.readyState, xhtp.status);
	//console.log("2")
};


let tableTag = document.createElement('table');

function createTable(data) {
	let servlet = data;
	tableTag.setAttribute('border', "1");
	let cap = document.createElement("caption");
	cap.appendChild(document.createTextNode("사원리스트"));
	//table.appendChild(cap);

	createHeader();
	for (let row of data) {
		let trTag = document.createElement('tr');
		trTag.setAttribute('id', row.employeeId) //tr을 id값으로 찾아올 용도
		//자식은 여러개니까 childnodes[] , 부모는 그냥parentnode

		trTag.onclick = trClick; //테이블의 tr클릭하면 trClick  ()쓰면 안댐!!!!!

		for (let field in row) {
			let tdTag = document.createElement('td');
			let text = document.createTextNode(row[field]);
			tdTag.appendChild(text); //td테그 만드는 작업
			trTag.appendChild(tdTag);
		}
		//<td><button>삭제</button></td>
		let btn = document.createElement('button');
		btn.onclick = frm_delete;
		let text = document.createTextNode('삭제');
		btn.appendChild(text);
		let tdTag = document.createElement('td');
		tdTag.appendChild(btn);
		trTag.appendChild(tdTag);


		tableTag.appendChild(trTag);
	}
	document.body.appendChild(tableTag);

}


function createHeader() {
	let title = ['employeeid', 'firstName', 'lastName', 'email', 'hireDate', 'delete'];
	let tr = document.createElement('tr');

	for (let field of title) {
		let td = document.createElement('th')
		let text = document.createTextNode(field);
		td.appendChild(text);
		tr.appendChild(td);
	}
	tableTag.appendChild(tr);
}

function showTitle() {
	let tr = document.createElemet('tr');
	for (let t of title) {
		let td = document.createElement('th');
		let text = document.createTextNode(t);
		td.appendChild(text);
		tr.appendChild(td)
	}
	return tr;
}

//저장버튼 누르면 전송
function frm_submit()  
	{
		if (frm.eid.value == "") {
			alert("please input id");
			frm.eid.focus(); //요 위치에서 깜빡여라
			return;
		}
		if (frm.first_name.value == "") {
			alert("please input first name");
			frm.first_name.focus(); //요 위치에서 깜빡여라
			return;
		}
		if (frm.email.value == "") {
			alert("please input email");
			frm.email.focus(); //요 위치에서 깜빡여라
			return;
		}

		//frm.submit();

		//비동기 방식으로
		let xhtp = new XMLHttpRequest();
		const id = document.querySelector('input[name="eid"]').value;
		const fn = document.querySelectorAll('input[name="first_name"]')[0].value;
		const ln = document.querySelectorAll('input[name="last_name"]')[0].value;
		const em = document.querySelectorAll('input[name="email"]')[0].value;
		const hd = document.querySelectorAll('input[name="hire_date"]')[0].value;
		const param = 'eid=' + id + '&first_name=' + fn + '&last_name=' + ln  + '&email=' + em  + '&hire_date=' + hd;
		//RegisterServlet? edi =1000 
		xhtp.open('get', 'registerServlet?' + param);
		xhtp.send();

		xhtp.onreadystatechange = function() {
			if (xhtp.readyState == 4 && xhtp.status == 200) {
				alert('ok');
				console.log(xhtp.responseText);
				const data = JSON.parse(xhtp.responseText);
				//data.id;
				//data.first_name;
				//data.email;
				//data.hire_date;

				//테이블에 바로 한건 추가한거 보이기.(입략한 값을 retun으로 받기)

				let tr = document.createElement('tr');
				for (let field in data) {
					let td = document.createElement('td');
					let text = document.createTextNode(data[field]);
					td.appendChild(text);
					tr.appendChild(td);
				}
				document.getElementsByTagName('table')[0].appendChild(tr);

			}
		}
		let btn = document.createElement('button');
		btn.onclick = frm_delete;
		let text = document.createTextNode('삭제');
		btn.appendChild(text);
		let tdTag = document.createElement('td');
		tdTag.appendChild(btn);
		trTag.appendChild(tdTag);
		tableTag.appendChild(trTag);


	}

	function trClick() {

		const eid = this.getAttribute("id"); //eid로 한 건 조회할 수 있도록.
		const xhtp = new XMLHttpRequest();
		xhtp.open('get', 'EmployeeServlet?eid=' + eid);
		xhtp.send();
		xhtp.onreadystatechange = function() {
			if (xhtp.readyState == 4 && xhtp.status == 200) {
				const data = JSON.parse(xhtp.responseText);
				console.log(data);
				document.querySelector('input[name="eid"]').value = data.employeeId;
				document.querySelector('input[name="last_name"]').value = data.lastName;
				document.querySelector('input[name="email"]').value = data.email;
				document.querySelector('input[name="hire_date"]').value = data.hireDate;
				document.querySelector('input[name="first_name"]').value = data.firstName;
			}
		}

	}//end of trClick

	//수정버튼 기능

	function frm_update() {
		let xhtp = new XMLHttpRequest();
		const id = document.querySelector('input[name="eid"]').value;
		const fn = document.querySelectorAll('input[name="first_name"]')[0].value;
		const ln = document.querySelectorAll('input[name="last_name"]')[0].value;
		const em = document.querySelectorAll('input[name="email"]')[0].value;
		const hd = document.querySelectorAll('input[name="hire_date"]')[0].value;
		const param = 'eid=' + id + '&first_name=' + fn + '&last_name=' + ln + '&email=' + em + '&hire_date=' + hd;
		//RegisterServlet? edi =1000 
		xhtp.open('get', 'EmpMod?' + param);
		xhtp.send();

		xhtp.onreadystatechange = function() {
			if (xhtp.readyState == 4 && xhtp.status == 200) {
				alert('ok');
				console.log(xhtp.responseText);
				const data = JSON.parse(xhtp.responseText);

				//data.employeeId 필드를 사용해서 테이블에서 tr의 id값이 같은 요소.
				const findTr = document.getElementById(data.employeeId); //tr찾기.
				findTr.childNodes[1].childNodes[0].nodeValue = data.firstName;
				findTr.childNodes[2].childNodes[0].nodeValue = data.lastName;
				findTr.childNodes[3].childNodes[0].nodeValue = data.email;
				findTr.childNodes[4].childNodes[0].nodeValue = data.hireDate;
			}
		}
	}

	function frm_delete() {
		alert('delete');// 경고창 띄우기(tr을 누른거니까 이벤트 전파를 차단해야.)
		
		const eid = this.parentNode.parentNode.getAttribute("id"); //eid로 한 건 조회할 수 있도록.
		const xhtp = new XMLHttpRequest();
		xhtp.open('get', 'DeleteEmp?eid=' + eid);
		xhtp.send();

		xhtp.onreadystatechange = function() {
		let id = this.parentNode.parentNode.getAttribute("id"); //부모의 부모의 아들의 첫번쨰 그 아들의 첫 아들
		console.log(id);
		this.parentNode.parentNode.remove();
		}

		
	
	}
