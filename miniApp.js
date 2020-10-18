const formAddStudent = document.querySelector('#form-add-student');
const students = document.querySelector('#students');
formAddStudent.addEventListener('submit', addStudent);

// input default studentsData if localstorage is empty
if(localStorage.getItem("studentsData") == undefined || 
   localStorage.getItem("studentsData") == "[]"){
    localStorage.setItem("studentsData", JSON.stringify(studentsData));
}
console.log(localStorage);
// parsing localStorage into var
var StoredStudentsData = JSON.parse(localStorage.getItem("studentsData"));

// add student
function addStudent(e) {
	e.preventDefault();

	// get input value
	const NIM = document.querySelector('#NIM').value;
	const fullName = document.querySelector('#fullName').value;
	var gender = '';
	if(document.getElementById('Male').checked){
		gender = "Male";
	} else {
		gender = "Female";
	}
	const fakultas = document.querySelector('#sel1').value;
	const study = document.querySelector('#sel2').value;

	// check if form is correct
	if(NIM=="" || fullName=="" || gender=="" || fakultas=="0" || study=="0"){
		alert("The Form is Incorrect");
		return;
	}

	// transfer form into localstorage
	var obj = {id:studentsData.length+1, NIM:NIM, fullName:fullName, gender:gender, fakultas:fakultas, study:study};
	StoredStudentsData.push(obj)
	localStorage.setItem("studentsData", JSON.stringify(StoredStudentsData));
	console.log(localStorage);
	FillStudentList();

	// clear form fields
	document.querySelector('#NIM').value = '';
	document.querySelector('#fullName').value = '';
	document.getElementsByName('gender').value = '';
	document.querySelector('#sel1').value = '0';
	var options = $("#sel1").data('options').filter('[class=0]');
	$('#sel2').html(options);
}

// filter by name textbox
function FilterName() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("nameSearch");
	filter = input.value.toUpperCase();
	table = document.getElementById("students");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByClassName("name")[0];
		if (td) {
			txtValue = td.textContent || td.innerText || td.value;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

//filter by faculty combobox
function FilterFaculty() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("sel3");
	filter = input.value.toUpperCase();
	table = document.getElementById("students");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByClassName("fakultas")[0];
		if (td) {
			txtValue = td.textContent || td.innerText || td.value;
			if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

//filter by program study combobox
function FilterStudy() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("sel4");
	filter = input.value.toUpperCase();
	table = document.getElementById("students");
	tr = table.getElementsByTagName("tr");

	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByClassName("study")[0];
		if (td) {
			txtValue = td.textContent || td.innerText || td.value;
			if (txtValue.toUpperCase().indexOf(filter) > -1 || filter == "0") {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}

//function for filling list
function FillStudentList() {
	$("#students tr").remove(); 
	for (var i = 0; i < StoredStudentsData.length; i++) {
		var row = students.insertRow(students.rows.length);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		var cell6 = row.insertCell(5);
		cell1.innerHTML = StoredStudentsData[i].NIM;
		cell2.innerHTML = StoredStudentsData[i].fullName;
		cell2.className = 'name';
		cell3.innerHTML = StoredStudentsData[i].gender;
		cell4.innerHTML = StoredStudentsData[i].fakultas;
		cell4.className = 'fakultas';
		cell5.innerHTML = StoredStudentsData[i].study;
		cell5.className = 'study';
		cell6.innerHTML = '<button class="btn btn-danger btn-sm float-center remove" onclick="DelRow(this)">Delete</button>';
	}

}

// delete a student
function DelRow(obj) {
	var RowNum = obj.closest('tr').rowIndex - 1;
    if (confirm("Are you sure to delete this student?")) {
		StoredStudentsData.splice(RowNum, 1);
		localStorage.setItem("studentsData", JSON.stringify(StoredStudentsData));
		console.log(localStorage);
		FillStudentList();
    } else {
    }
}

