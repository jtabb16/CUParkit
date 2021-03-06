/*
 * This file is to View/query/update user accounts
*/
console.log("entering modify_one_user.js");
$(function(){
  // //===start of listening update button====
  $("#modifyOneUserButton").click(function(){
    let userId = $("#oneUserId").val();
    console.log(userId);
    if (null == userId || ""== userId){
      alert("Pls input a user ID first!");
      return;
    }
    console.log("detecting listOneUserButton click event");
    //empty the div first
    $("#paginationData").empty(); 
    createForm(userId);
  }); //#listAllUserButton" click event.
  // //===end of listening update button====

  // //===start of listening submit button====
  $(document).on('click', '#ownerBtn', function(){
    console.log("detecting submit button click event");
    // //Get data from HTML Form
    // let formValues = formDataToJson($("#oneUserForm")); //can't use this method
    let formvalue = document.getElementById("oneUserForm");
    // console.log(formvalue);
    let formValues = formDataToJson(formvalue);
    // let formValues = $("#oneUserForm").serialize(); //jquery method
    let formVal = JSON.stringify(formValues);
    //submit the modification
    modifyOneUser(formVal);
    // modifyOneUser_axios(formValues); //use axios 
  }); //===end of listening submit button====

  // //===start of listening delete button====
  $(document).on('click', '#deleteOneUserButton', function(){
    //Get data
    let ownerId = document.getElementById("oneUserId").value;
    let ownerIdJson = JSON.stringify({oid: ownerId});
    deleteOneUser(ownerIdJson);
  });
  // //===end   of listening delete button====

  console.log("leave modify_one_user.js");
});


let deleteOneUser = (usrId) => {
  // console.log(usrId); 
  $.ajax({
    method: "POST",
    url: window.location.pathname + '../../../api/Owner/delete.php', 
    data: usrId,
    dataType: 'json',
    beforeSend: function(){
      console.log("start sending delete request");
      console.log(usrId);
    },
    success: function(dataFromServer){
      if (dataFromServer.message) {
        // document.getElementById("messageBox").innerHTML = dataFromServer.message + "<br>";
        $("#messageBox").html(dataFromServer.message + "<br>");
      }
      console.log("delete success");
      console.log(dataFromServer);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }       
  });
}


//update user info
let modifyOneUser = (formData) =>{
  // console.log(usrId);
  $.ajax({
    //the web server can't use PUT
    method: "POST",
    data: formData,
    url: window.location.pathname + '../../../api/Owner/update.php',
    // headers: {
    //   "X-HTTP-Method-Override": "PUT",
    //   "Content-Type": "application/json"
    // },
    dataType: 'json',
    beforeSend: function(){
      console.log("sending data....");
    },
    success: function(dataFromServer){
      console.log(".ajax success");
      console.log(dataFromServer);
      // displayResult(dataFromServer);
      // $("#paginationData").html(dataFromServer);
    }, //.ajax success module
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }       
  }); //.ajax module
} //loadData function end

//axios method
let modifyOneUser_axios = (formData) => {
  let handleError = (err) => {
    // console.log(err.response);
    // document.getElementById("messageBox").innerHTML = JSON.stringify(err.response);
    document.getElementById("messageBox").innerHTML = err.response.data.message + "<br>";
    if (res.data.code)
        document.getElementById("messageBox").innerHTML = err.response.data.code + "<br>";
  };

  // Post data to API with Axios
  axios.post(window.location.pathname + '../../../api/Owner/update.php',
   formData)
  .then(res => {
      document.getElementById("messageBox").innerHTML += res.data.message + "<br>";
      if (res.data.passwordMsg) {
          document.getElementById("messageBox").innerHTML += res.data.passwordMsg + "<br>";
      }
  }).catch((err) => handleError);
};

// //===== start of Get Data function=========
let formDataToJson = (formElement) =>{
   let formData = new FormData(formElement);
   let convertedJson = {};
   formData.forEach((value, key) => {
     convertedJson[key] = value;
   });
   return convertedJson;
};
// //===== end of Get Data function=========

//create Form for input
let createForm = (usrId) => {
  // console.log(usrId);
  //get the div container
  let tableInDiv = document.getElementById("paginationData");
  // tableInDiv.setAttribute("class", "pt-2");
  //create a row1 in Div
  let tableHeaderRowInDiv = document.createElement("div");
  tableHeaderRowInDiv.setAttribute("class", "row mx-0 bg-secondary justify-content-left");
  tableInDiv.appendChild(tableHeaderRowInDiv); 
  //create col 1 in row 1
  let tableHeaderColInDiv1 = document.createElement("div");
  tableHeaderColInDiv1.setAttribute("class", "col-1 col-sm-2 col-md-2 col-lg-2 text-center "); 
  // tableHeaderColInDiv.innerText = Object.keys(usrResult[0])[i];
  tableHeaderRowInDiv.appendChild(tableHeaderColInDiv1);
  //create col 2 in row 1
  let tableHeaderColInDiv2 = document.createElement("div");
  tableHeaderColInDiv2.setAttribute("class", "col-5 col-sm-8 col-md-8 col-lg-8 border text-center bg-info"); 
  // tableHeaderColInDiv.innerText = Object.keys(usrResult[0])[i];
  tableHeaderRowInDiv.appendChild(tableHeaderColInDiv2); 
  //create Form 
  let form1 = document.createElement("form");
  form1.setAttribute("id", "oneUserForm");
  tableHeaderColInDiv2.appendChild(form1);

  //create t1r1  for ID in form1
  let t1r1 = document.createElement("div");
  t1r1.setAttribute("class", "form-group row");
  form1.appendChild(t1r1);
  //create t1r1c1 for ID label 
  let t1r1c1 = document.createElement("label");
  t1r1c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r1c1.setAttribute("for", "ownerId");
  t1r1c1.innerHTML="ID";
  t1r1.appendChild(t1r1c1);
  //create t1r1c2 for ID input 
  let t1r1c2 = document.createElement("div");
  t1r1c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r1.appendChild(t1r1c2);
  //create ID input in t1r1c2 
  let t1r1c2Input = document.createElement("input");
  t1r1c2Input.setAttribute("class", "form-control");
  t1r1c2Input.setAttribute("type", "text");
  t1r1c2Input.setAttribute("name", "oid");
  t1r1c2Input.setAttribute("id", "ownerId");
  // t1r1c2Input.setAttribute("disabled", "disabled");
  t1r1c2Input.setAttribute("readonly", "true");
  // t1r1c2Input.setAttribute("size", "90");
  // t1r1c2Input.setAttribute("placeholder", "C9000001");
  // document.getElementById("ownerId").value =usrId;
  // t1r1c2Input.innerText = usrId;
  t1r1c2Input.value = usrId;
  t1r1c2.appendChild(t1r1c2Input);
  
  //create t1r2 for Name in form1
  let t1r2 = document.createElement("div");
  t1r2.setAttribute("class", "form-group row");
  form1.appendChild(t1r2);
  //create t1r2c1 for Name label 
  let t1r2c1 = document.createElement("label");
  t1r2c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r2c1.setAttribute("for", "ownerName");
  t1r2c1.innerHTML="Name";
  t1r2.appendChild(t1r2c1);
  //create t1r2c2 for Name input 
  let t1r2c2 = document.createElement("div");
  t1r2c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r2.appendChild(t1r2c2);
  //create Name input in t1r2c2 
  let t1r2c2Input = document.createElement("input");
  t1r2c2Input.setAttribute("class", "form-control");
  t1r2c2Input.setAttribute("type", "text");
  t1r2c2Input.setAttribute("name", "name");
  t1r2c2Input.setAttribute("id", "ownerName");
  // t1r1c2Input.setAttribute("size", "90");
  t1r2c2Input.setAttribute("placeholder", "John");
  t1r2c2.appendChild(t1r2c2Input);

  //create t1r3 for Tel in form1
  let t1r3 = document.createElement("div");
  t1r3.setAttribute("class", "form-group row");
  form1.appendChild(t1r3);
  //create t1r3c1 for Tel label 
  let t1r3c1 = document.createElement("label");
  t1r3c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r3c1.setAttribute("for", "ownerTel");
  t1r3c1.innerHTML="Tel";
  t1r3.appendChild(t1r3c1);
  //create t1r3c2 for Tel input 
  let t1r3c2 = document.createElement("div");
  t1r3c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r3.appendChild(t1r3c2);
  //create TEl input in t1r3c2 
  let t1r3c2Input = document.createElement("input");
  t1r3c2Input.setAttribute("class", "form-control");
  t1r3c2Input.setAttribute("type", "text");
  t1r3c2Input.setAttribute("name", "tel");
  t1r3c2Input.setAttribute("id", "ownerTel");
  // t1r1c2Input.setAttribute("size", "90");
  t1r3c2Input.setAttribute("placeholder", "864-321-4562");
  t1r3c2.appendChild(t1r3c2Input);

  //create fieldset for type radios
  let fieldset1 = document.createElement("fieldset");
  fieldset1.setAttribute("class", "form-group");
  form1.appendChild(fieldset1);

  let f1r1 = document.createElement("div");
  f1r1.setAttribute("class", "row");
  fieldset1.appendChild(f1r1);

  //f1r1c1 for legend
  let f1r1c1 = document.createElement("legend");
  f1r1c1.setAttribute("class", "col-form-label col-sm-3 pt-0");
  f1r1c1.innerHTML="Type"
  f1r1.appendChild(f1r1c1);
  
  //f1r1c2 for type radios
  let f1r1c2 = document.createElement("div");
  f1r1c2.setAttribute("class", "col-sm-9 text-left");
  f1r1.appendChild(f1r1c2);

  //f1r1c2ck1 for check1
  let f1r1c2ck1 = document.createElement("div");
  f1r1c2ck1.setAttribute("class", "form-check");
  f1r1c2.appendChild(f1r1c2ck1);
  //f1r1c2ck1Radio for radio in check1
  let f1r1c2ck1Radio = document.createElement("input");
  f1r1c2ck1Radio.setAttribute("class", "form-check-input");
  f1r1c2ck1Radio.setAttribute("type", "radio");
  f1r1c2ck1Radio.setAttribute("id", "ownerType1");
  f1r1c2ck1Radio.setAttribute("value", "Employee");
  f1r1c2ck1Radio.setAttribute("name", "type");
  f1r1c2ck1.appendChild(f1r1c2ck1Radio)
  //f1r1c2ck1Lable for label in check1
  let f1r1c2ck1Label = document.createElement("label");
  f1r1c2ck1Label.setAttribute("class", "form-check-label");
  f1r1c2ck1Label.setAttribute("for", "ownerType1");
  f1r1c2ck1Label.innerText="Employee";
  f1r1c2ck1.appendChild(f1r1c2ck1Label)

  //f1r1c2ck2 for check2
  let f1r1c2ck2 = document.createElement("div");
  f1r1c2ck2.setAttribute("class", "form-check");
  f1r1c2.appendChild(f1r1c2ck2);
  //f1r1c2ck1Radio for radio in check1
  let f1r1c2ck2Radio = document.createElement("input");
  f1r1c2ck2Radio.setAttribute("class", "form-check-input");
  f1r1c2ck2Radio.setAttribute("type", "radio");
  f1r1c2ck2Radio.setAttribute("id", "ownerType2");
  f1r1c2ck2Radio.setAttribute("name", "type");
  f1r1c2ck2Radio.setAttribute("value", "Student");
  f1r1c2ck2.appendChild(f1r1c2ck2Radio)
  //f1r1c2ck1Lable for label in check1
  let f1r1c2ck2Label = document.createElement("label");
  f1r1c2ck2Label.setAttribute("class", "form-check-label");
  f1r1c2ck2Label.setAttribute("for", "ownerType2");
  f1r1c2ck2Label.innerText="Student";
  f1r1c2ck2.appendChild(f1r1c2ck2Label)

  //f1r1c2ck3 for check3
  let f1r1c2ck3 = document.createElement("div");
  f1r1c2ck3.setAttribute("class", "form-check");
  f1r1c2.appendChild(f1r1c2ck3);
  //f1r1c2ck1Radio for radio in check1
  let f1r1c2ck3Radio = document.createElement("input");
  f1r1c2ck3Radio.setAttribute("class", "form-check-input");
  f1r1c2ck3Radio.setAttribute("type", "radio");
  f1r1c2ck3Radio.setAttribute("id", "ownerType3");
  f1r1c2ck3Radio.setAttribute("name", "type");
  f1r1c2ck3Radio.setAttribute("value", "Vistor");
  f1r1c2ck3.appendChild(f1r1c2ck3Radio)
  //f1r1c2ck1Lable for label in check1
  let f1r1c2ck3Label = document.createElement("label");
  f1r1c2ck3Label.setAttribute("class", "form-check-label");
  f1r1c2ck3Label.setAttribute("for", "ownerType3");
  f1r1c2ck3Label.innerText="Vistor";
  f1r1c2ck3.appendChild(f1r1c2ck3Label)

  //create t1r4 for password in form1
  let t1r4 = document.createElement("div");
  t1r4.setAttribute("class", "form-group row");
  form1.appendChild(t1r4);
  //create t1r4c1 for password label 
  let t1r4c1 = document.createElement("label");
  t1r4c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r4c1.setAttribute("for", "ownerPass1");
  t1r4c1.innerHTML="Password";
  t1r4.appendChild(t1r4c1);
  //create t1r4c2 for password input 
  let t1r4c2 = document.createElement("div");
  t1r4c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r4.appendChild(t1r4c2);
  //create password input in t1r4c2 
  let t1r4c2Input = document.createElement("input");
  t1r4c2Input.setAttribute("class", "form-control");
  t1r4c2Input.setAttribute("type", "password");
  t1r4c2Input.setAttribute("name", "pass");
  t1r4c2Input.setAttribute("id", "ownerPass1");
  t1r4c2Input.setAttribute("placeholder", "PxRk#3r87");
  t1r4c2.appendChild(t1r4c2Input);

  //create t1r5 for password in form1
  let t1r5 = document.createElement("div");
  t1r5.setAttribute("class", "form-group row");
  form1.appendChild(t1r5);
  //create t1r5c1 for password label 
  let t1r5c1 = document.createElement("label");
  t1r5c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r5c1.setAttribute("for", "ownerPass2");
  t1r5c1.innerHTML="Confirm Pass";
  t1r5.appendChild(t1r5c1);
  //create t1r5c2 for password input 
  let t1r5c2 = document.createElement("div");
  t1r5c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r5.appendChild(t1r5c2);
  //create password input in t1r5c2 
  let t1r5c2Input = document.createElement("input");
  t1r5c2Input.setAttribute("class", "form-control");
  t1r5c2Input.setAttribute("type", "password");
  t1r5c2Input.setAttribute("name", "checkPass");
  t1r5c2Input.setAttribute("id", "ownerPass2");
  t1r5c2Input.setAttribute("placeholder", "PxRk#3r87");
  t1r5c2.appendChild(t1r5c2Input);

  //create t1r6 for submit button in form1
  let t1r6 = document.createElement("div");
  t1r6.setAttribute("class", "form-group row");
  form1.appendChild(t1r6);
  //create t1r6c1 for password label 
  let t1r6c1 = document.createElement("label");
  t1r6c1.setAttribute("class", "col-sm-3 col-form-label");
  t1r6c1.setAttribute("for", "ownerBtn");
  t1r6c1.innerHTML="Button";
  t1r6.appendChild(t1r6c1);
  //create t1r5c2 for password input 
  let t1r6c2 = document.createElement("div");
  t1r6c2.setAttribute("class", "col-9 col-sm-9 col-md-9 col-lg-9");
  t1r6.appendChild(t1r6c2);
  //create password input in t1r5c2 
  let t1r6c2Input = document.createElement("button");
  t1r6c2Input.setAttribute("class", "btn btn-danger btn-lg");
  t1r6c2Input.setAttribute("type", "button");
  t1r6c2Input.setAttribute("id", "ownerBtn");
  t1r6c2Input.setAttribute("placeholder", "Submit");
  t1r6c2Input.innerHTML = "Submit";
  t1r6c2.appendChild(t1r6c2Input);

}//end of create Form for input


