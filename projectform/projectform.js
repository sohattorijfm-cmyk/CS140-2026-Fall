document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const fullName = document.getElementById('personname').value;
  const studentId = document.getElementById('studentID').value;
  const password = document.getElementById('password').value;
  const comments = document.getElementById('comments').value;
  const foodOrigin = document.getElementById('foodorigin').value;

  let gender = '';
  if (document.getElementById('male').checked) {
    gender = 'male';
  } else if (document.getElementById('female').checked) {
    gender = 'female';
  }

  let year = '';
  if (document.getElementById('freshman').checked) {
    year = 'Freshman';
  } else if (document.getElementById('sophomore').checked) {
    year = 'Sophomore';
  } else if (document.getElementById('junior').checked) {
    year = 'Junior';
  } else if (document.getElementById('senior').checked) {
    year = 'Senior';
  }

  if (!fullName || !studentId || !comments) {
    alert('Full Name, Student ID, and Requested Food cannot be blank.');
    return;
  }

  if (studentId.length !== 7 || isNaN(studentId)) {
    alert('Student ID must be 7 numbers.');
    return;
  }

  const studentIdNum = Number(studentId);
  if (studentIdNum < 1000000 || studentIdNum > 9999999) {
    alert('Student ID must be between 1000000 and 9999999.');
    return;
  }

  const formData = {
    fullName: fullName,
    studentId: studentId,
    password: password,
    gender: gender,
    year: year,
    comments: comments,
    foodOrigin: foodOrigin,
    morning: document.getElementById('morning').checked,
    lunch: document.getElementById('lunch').checked,
    dinner: document.getElementById('dinner').checked
  };

  console.log(formData);
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "projctform.json", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const message = document.getElementById('message');
      const response = JSON.parse(xhr.responseText);
      message.textContent = response.message;
      const form = document.getElementById('myForm');
      form.reset();
      alert(`Success: ${fullName}`);
    } else if (xhr.readyState === 4) {
      alert('Error submitting form.');
    }
  };
  xhr.send(JSON.stringify(formData));
});