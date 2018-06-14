$(".unobs").remove();

//positioning the cursor in the text area when the program is launched
document.querySelector("label[for='name']").focus();

/*creating a textarea when choosing the option "other" in the Job Role dropdown list
  having eliminated the two html lines that created the textarea for unobstrusive 
  JavaScript purposes*/
$("#title").on('change', (e) => {
	let x = $("#title option:selected").text();
	if ( x === "Other") {
		$("fieldset.shirt").before("<h2 class='other-title'>Please describe Your Job Role</h2>");
		$("fieldset.shirt").before("<textarea class='other-title' id='other-title' placeholder='Your Job Role'></textarea>");
	} else {
		$(".other-title").remove();
	}	
});

/*Creating an array of objects "stockRef". 
  There are as many objects as themes are available
  Each object has four properties: 
  theme (name) and the three colors available per each theme (color1, color2 and color3)*/

let themesNumber = 2;
let stockRef = [];
for (i=1; i<=themesNumber; i +=1) {
    stockRef[i-1] = {
		name:'',
		color1:'',
		color2:'',
		color3:'',
	};	
};

stockRef[0].name = $("select#design")[0][1].text;

stockRef[0].color1 = $("select#color")[0][0].value;
stockRef[0].color2 = $("select#color")[0][1].value;
stockRef[0].color3 = $("select#color")[0][2].value;	

stockRef[1].name = $("select#design")[0][2].text;

stockRef[1].color1 = $("select#color")[0][3].value;
stockRef[1].color2 = $("select#color")[0][4].value;
stockRef[1].color3 = $("select#color")[0][5].value;	

/* Defining the colors to be offered once a theme election has been done 
	   Emptying the "design" and "color" drop down menus before we know
	   which colors are available per theme. The color drop down list will 
	   only appear when we choose a theme in the theme drop down list */ 
$("select#design").empty();
$("label[for='color']").hide();
$("select#color").hide();
$("select#color").empty();

	/*Based on the abovecreated array of objects "stockRef" (theme name plus 
	associated available colors) we create a theme drop down list without a 
	generic title like Themes */
	  
for (i=1; i<=themesNumber; i +=1) {
  	$("select#design").append("<option value="+stockRef[i-1].name+">"+stockRef[i-1].name+"</option>");
}
	/*Listening to the choosen theme we show a created available colors drop down list*/

$("#design").on('click', (e) => {
	e.preventDefault();
	let y = "";
	y = $("#design option:selected").text();
	/*We show the color drop down list */
	$("select#color").show();
	/*We create the color drop down list*/
	$("select#color").empty();
	$("label[for='color']").show();
	/*We define the color options after the design has been selected */
	if ( y === "Theme - JS Puns") { 
		$("select#color").append("<option value="+stockRef[0].color1+">"+stockRef[0].color1+"</option>");
  		$("select#color").append("<option value="+stockRef[0].color2+">"+stockRef[0].color2+"</option>");
  		$("select#color").append("<option value="+stockRef[0].color3+">"+stockRef[0].color3+"</option>");
	} else {
		$("select#color").append("<option value="+stockRef[1].color1+">"+stockRef[1].color1+"</option>");
  		$("select#color").append("<option value="+stockRef[1].color2+">"+stockRef[1].color2+"</option>");
  		$("select#color").append("<option value="+stockRef[1].color3+">"+stockRef[1].color3+"</option>");	
	};				
});

/* defining an object for each course containing 17 properties plus as many as courses minus one. */
let courseData 
let courseNumber = 6;

/* Using the "compat", "eqhourfin", "eqhourfin" and "title" properties 
   we can test hour compatibility between courses*/
function checkCourseCompatibility(courseData) {
	courseData[0].compat = [1,1,1,1,1,1,1];
	let comptCourses = [];
	comptCourses[0] = 1;
	for(let i=1; i<=courseNumber; i +=1){
		comptCourses = courseData[i].compat
		for (let j=1; j<=courseNumber; j +=1){
			if (courseData[i].eqhourfin <=courseData[j].eqhourinit || courseData[j].eqhourfin <=courseData[i].eqhourinit){
				comptCourses[j] = 1;
			} else if (courseData[i].title === courseData[j].title) {
				comptCourses[j] = 1;
			} else {
				comptCourses[j] = 0;
			}
		}
		courseData[i].compat.push(comptCourses);
	}	
    return courseData
}

function generateCoursesData(){
	let courseData=[];
	for(let i=0; i<= courseNumber; i +=1){
		let courses = generateCourseData(i);
		courseData.push(courses);		
	};		
	checkCourseCompatibility(courseData);
	return courseData;
}

function generateCourseData(i){
	let course = {};
/* Property "number" */
	course.number = i;
/* Property "title" */
	course.title = document.querySelectorAll(".activities label")[i].textContent;
/*1.1. -Preparing to define the "equivalent initial hour" and "equivalent final hour" 
   properties taking the interval in the course definition and breaking it into
   small pieces: interval, number, number as an integer, am, pm  */
   /* 1.2.a. General course */
	if (course.number = 0) {
		course.weekday = "All week";
		day = 0;
		course.interval = "0am-12am";
    	course.inithourmd = "0am"
    	course.inithournumb = "0" 
		course.inithourN = 0
		course.inithourAMPM = "am"
		course.finhourmd = "12am"
		course.finhournumb = "12"
		course.finhourN = 12;
		course.finhourAMPM = "am";
		course.costCourse = 200;
		course.eqhourinit = 0;
		course.eqhourfin = 24*7;
	} else {
	/* 1.2.b. Non General Courses */	
		course.weekday = course.title.substring((course.title.indexOf('—')+2),(course.title.indexOf(' ', (course.title.indexOf('—')+2))));
    	course.interval = course.title.substring((course.title.indexOf(' ', (course.title.indexOf('—')+2))+1),(course.title.indexOf(',')));
    	course.inithourmd = course.interval.substring(course.interval.indexOf(0),course.interval.indexOf('-'));
    	course.inithournumb = course.inithourmd.substring(0,(course.inithourmd.indexOf('m')-1));
		course.inithourN = parseInt(course.inithourmd.substring(0,(course.inithourmd.indexOf('m')-1)));
		course.inithourAMPM = course.inithourmd.substring((course.inithourmd.indexOf('m')-1),course.inithourmd.indexOf('m')+1);
		course.finhourmd = course.interval.substring((course.interval.indexOf('-')+1), course.interval.length);
		course.finhournumb = course.finhourmd.substring(0,course.finhourmd.indexOf('p'));
		course.finhourN = parseInt(course.finhourmd.substring(0,course.finhourmd.indexOf('p')));
		course.finhourAMPM = course.finhourmd.substring((course.finhourmd.length-2),course.finhourmd.length);
/* Property "cost course" */
		course.costCourse = parseInt(course.title.substring((course.title.indexOf('$')+1),(course.title.length)));
/* 1.3. Passing from day name to day number of the week */
		let day = 0;
		if (course.weekday === 'Monday') {	
			day = 1;
		} else if (course.weekday === 'Tuesday'){		
			day = 2;	
		} else if (course.weekday === 'Wednesday'){		
			day = 3;	
		} else if (course.weekday === 'Thursday'){
			day = 4;	
		} else if (course.weekday === 'Friday'){
			day = 5;	
		} else if (course.weekday === 'Saturday'){
			day = 6;	
		} else {
			day = 7;	
		};	
/* 1.4.Finally defining the properties "equivalent initial hour" and "equivalent final hour" */
		course.eqhourinit = 0;
		if (course.inithourAMPM === 'am') {
			course.eqhourinit = (day-1)*24 + course.inithourN;
		} else if (course.inithourN != 12 ) {
			course.eqhourinit = (day-1)*24 + 12 + course.inithourN;
		} else {
			course.eqhourinit = (day-1)*24 + 12;	
		};	

		course.eqhourfin = 0;
		if (course.finhourAMPM === 'am') {
    		course.eqhourfin = (day-1)*24 + course.finhourN;	
		} else if (course.finhourN != 12 ) {
			course.eqhourfin = (day-1)*24 + 12 + course.finhourN;
		} else {
			course.eqhourfin = (day-1)*24 + 12;
		};	
		course.compat = [];
	};
	course.name = document.querySelectorAll(".activities label input")[i].name;
	return course;
}
courseData = generateCoursesData();
 
/* Disabling/enabling non compatible courses when choosing a course and preparing the bill */
let theBill = 0;
let finalBill = "$0";
let counter = 0
$(".activities").on('change',(e)=>{
	e.preventDefault();
	counter += 1;
	let choosenAct = e.target.name;
	let checkbox = e.target;
	let checked = checkbox.checked;
	if (counter === 1) {
	/* Showing the bill */	
		$(".activities").after("<div class='finalbill'></div>");
		$("div.finalbill").append("<legend>Amount to be paid for the courses</legend>");
	}
	if (checked) {                     
		for(i=0; i<=courseNumber; i +=1) {
			if(courseData[i].name === choosenAct) {
				/* adding the cost of the course to the bill */
				theBill = theBill + courseData[i].costCourse;
				/* looking for incompatibilities */
				for(j=0; j<courseNumber; j +=1) {
					if(courseData[i].compat[j] === 0) {
						document.querySelectorAll(".activities label")[j].className = "graying";
						document.querySelectorAll(".activities label input")[j].disabled = true;
					};
				};
			};
		};	
	} else {
		for(i=0; i<=courseNumber; i +=1) {
			if(courseData[i].name === choosenAct) {
				/* substracting the cost of the course to the bill */	
				theBill = theBill - courseData[i].costCourse;
				/* looking for incompatibilities */
				for(j=0; j<courseNumber; j +=1) {
					if(courseData[i].compat[j] === 0) {	
						document.querySelectorAll(".activities label")[j].className = "ungraying";
						document.querySelectorAll(".activities label input")[j].disabled = false;
					};
				};
			};
		};		
	};	
	/*Presenting the final bill */
	finalBill = "$"+theBill;
	if (counter === 1) {
		$("div.finalbill legend").append("<p class='totalbill'>"+ finalBill+ "</p>");
	} else {
		$("p.totalbill").text(finalBill);
	};	
});

/* Eliminating the Select Payment and placing Credit Card as the default payment option*/
$("select#payment option[value='select_method']").remove();
$("div.credit-card").next().hide()
$("div.credit-card").next().next().hide();

/* Choosing the payment method: Credit Card, Bitcoin or PayPal */
$("#payment").on('click', (e) => {
	e.preventDefault();
	let w = $("#payment option:selected").text();
	if(w === "PayPal") {
		$("div.credit-card").hide();
		$("div.credit-card").next().show();
		$("div.credit-card").next().next().hide(); 
	} else if (w === "Bitcoin") {
		$("div.credit-card").hide();
		$("div.credit-card").next().hide();
		$("div.credit-card").next().next().show();
		$("selec#payment").append("<a src='http//www.coinbase.com/us/home' target='_blank'>Go to Coinbase</a>");
	} else {
		$("div.credit-card").show();
		$("div.credit-card").next().hide();
		$("div.credit-card").next().next().hide();
	}
});

/* Checking if an email address just after typing it
   The check looks for an acceptable email format: contains "@", contains a "." four 
   places from the end, there are symbols before the "@"  */
$("input#mail").on('keyup', (e) => {
	let eaddress = $("input#mail").val().length;
	let ampersand = $("input#mail").val().search("@");
	let point = $("input#mail").val().indexOf(".");
	if (ampersand === "-1" || ampersand < 1 || point !== (eaddress -4) || ampersand === point) {
	/* showing a message indicating that the email address is not correct  */	
		$("input#mail").after("<p class='missemail'>The form will not be submitted without a valid email address</p>");	
	}
	$("input#mail").on('keydown', (e) => {
		$("p.missemail").remove(); 
	});	
});

/* Defining all the conditions that will prevent from submitting the form and defining warning
   messages and red bold border fields when inadequate content  */
$("button").on('click', (e) => {
	e.preventDefault();	
	/*Preparing to check email format adequacy */
	let eaddress = $("input#mail").val().length;
	let ampersand = $("input#mail").val().search("@");
	let point = $("input#mail").val().indexOf(".");
	let inhibitor = 0;
	/* Name field empty: message and red bold border is created  */
	if($("input#name").val() ==="") {
		inhibitor = 0;
		$("button").disabled = true;
		$("input#name").after("<p class='missname'>The form will not be submitted without a Name</p>");
		$("input#name").css("border-color","red");
		$("input#name").css("border-width", "thick");
		$("label[for='name']").focus();
		inhibitor = 1;
	/* Email field empty: message and red bold border is created */	
	} else if ($("input#mail").val() ==="") {		
		inhibitor = 0;
		$("button").disabled = true;
		$("input#mail").after("<p class='missemail'>The form will not be submitted without a valid email address</p>");
		$("input#mail").css("border-color","red");
		$("input#mail").css("border-width", "thick");
		$("label[for='mail']").focus();
		inhibitor = 1;
	/* Email address is not correct: missing elements in its format: conditional messages and 
	   red bold border are created */	
	} else if (ampersand === "-1" || ampersand < 1 || point !== (eaddress -4) || ampersand === point) {
		inhibitor = 0;
		$("button").disabled = true;
		$("input#mail").after("<p class='missemail'>The form will not be submitted without a valid email address</p>");
		$("input#mail").css("border-color","red");
		$("input#mail").css("border-width", "thick");
		inhibitor = 1;
	/* No courses selected (= no cost) */
	} else if (finalBill === "$0"){
		inhibitor = 0;
		$("button").disabled = true;
		$(".activities").append("<p class='noactivity'>The form will not be submitted without choosing courses</p>");
		inhibitor = 1;
	/* Missing elements in the credit card information: : conditional message are created */
	} else if ($("#payment option:selected").text() === "Credit Card") {	
	/* Credit card number field is empty or credit card has inadequate number*/
		/* Credit card number has less than 13 numbers */
		if ($("input#cc-num").val().length<13) {
			inhibitor = 0;
			$("button").disabled = true;
			/* Red bold border is created */
			$("input#cc-num").css("border-color","red");
			$("input#cc-num").css("border-width", "thick");
			$("label[for='cc-num']").focus();
			/* Credit card number field is empty. Condiitonal message for need to provide number*/
			if($("input#cc-num").val() === "") {
				$("input#cc-num").after("<p class='wrongcard'>The form will not be submitted, card number field is empty</p>");	
				inhibitor = 1;
			} else {
			/* Credit card number has wrong number. Conditional message for wrong number */	
				$("input#cc-num").after("<p class='wrongcard'>The form will not be submitted, card number must have between 13 and 16 numbers</p>");
				inhibitor = 1;
			}
		/* Credit card number has more than 16 numbers. Conditional message for wrong number*/			
		} else if ($("input#cc-num").val().length>16) {
			inhibitor = 0;
			$("button").disabled = true;	
			/* Red bold border is created */	
			$("input#cc-num").css("border-color","red");
			$("input#cc-num").css("border-width", "thick");
			/* Conditional message for wrong number*/
			$("input#cc-num").after("<p class='wrongcard'>The form will not be submitted, card number must have between 13 and 16 numbers</p>");
			inhibitor = 1;
	/* Credit card zip field is empty or has an inadequate number*/	
		} else if ($("input#zip").val().length != 5) {
			inhibitor = 0;
			$("button").disabled = true;
			/* Red bold border is created */		
			$("input#zip").css("border-color","red");
			$("input#zip").css("border-width", "thick");
			/* Credit card zip field is empty. Condiitonal message for need to provide zip*/
			if($("input#zip").val() === "") {
				$("input#cc-num").after("<p class='wrongzip'>The form will not be submitted, zip field is empty</p>");
				inhibitor = 1;
			} else {
			/* Credit card zip field has wrong number. Conditional message for wrong zip */	
				$("p.wrongzip").hide();
				$("input#cc-num").after("<p class='wrongzip'>The form will not be submitted, zip must have 5 numbers</p>");
				inhibitor = 1;
			}	
		/* Credit card cvv field is empty or has an inadequate number*/	
		} else if ($("input#cvv").val().length != 3) {
			inhibitor = 0;
			$("button").disabled = true;	
			/* Red bold border is created */
			$("input#cvv").css("border-color","red");
			$("input#cvv").css("border-width", "thick");
			/* Credit card cvv field is empty. Condiitonal message for need to provide cvv*/
			if($("input#cvv").val() === "") {
				$("input#cc-num").after("<p class='wrongcvv'>The form will not be submitted, cvv field is empty</p>");
				inhibitor = 1;
			} else {
			/* Credit card cvv field has wrong number. Conditional message for wrong cvv */	
				$("p.wrongcvv").hide();
				$("input#cc-num").after("<p class='wrongcvv'>The form will not be submitted, cvv must have 3 numbers</p>");
				inhibitor = 1;
			}
		}	
	/* we'll take you to Paypal's site to set up your billing information, when you click “Register”*/		
	} else if ($("#payment option:selected").text() === "PayPal") {
		window.open('http://www.paypal.com/us/home','_blank');
	/* we'll take you to Coinbase's site to set up your billing information, when you click “Register” */	
	} else if ($("#payment option:selected").text() === "Bitcoin") {
		window.open('http://www.coinbase.com','_blank');
	} 
	let finalmessage = "";
	if (inhibitor != 1) {
		finalmessage = "All OK";
	};	
//	$("span.unobs").remove();
	if (finalmessage === "All OK") {
		console.log ("All OK");
		$("button").after("<span class='unobs'>    The form has succesfully been submitted!</span>");
		$("form")[0].reset();
		document.querySelector("label[for='name']").focus();
		$(".unobs").remove();
		$(".totalbill").remove();
		$(".other-title").remove();
		$(".finalbill").remove();
		for (j=1; j<= courseNumber; j +=1) {
			document.querySelectorAll(".activities label input")[j].disabled = true;
			document.querySelectorAll(".activities label")[j].className = "ungraying";
		};	
	};
});	

/*Chapter on type corrections and elimination of warning messages of all kinds*/
/* Name correction and elimination of empty name field message and bold red border */
$("input#name").on('change', (e) => {
	if($("input#name").val() !="") {
		$("button").disabled = false;
		$("p.missname").hide();
		$("input#name").css("border-color","#5e97b0");
		$("input#name").css("border-width", "thin");   
	}	
});

/* Email correction and elimination of conditional messages and bold red border */
$("input#mail").on('change', (e) => {
	if($("input#mail").val() !="") {
		$("button").disabled = false;
		$("p.missemail").hide();
		$("input#mail").css("border-color","#5e97b0");
		$("input#mail").css("border-width", "thin");   
	}	
});

/* Courses choosen and elimination of no courses choosen */
$(".activities").on('change', (e) => {
	if (finalBill !== "$0") {
		$("button").disabled = false;
		$("p.noactivity").hide();    
	}	
});

/* Credit card number correction and elimination of conditional messages and bold red border */
$("input#cc-num").on('change', (e) => {
	if ($("#payment option:selected").text() === "Credit Card") {
		if ($("input#cc-num").val().length>=13) {	
			$("button").disabled = false;
			$("p.wrongcard").hide();
			$("input#cc-num").css("border-color","#5e97b0");
			$("input#cc-num").css("border-width", "thin");   	
		} else if ($("input#cc-num").val().length<=16) {
			$("button").disabled = false;
			$("p.wrongcard").hide();
			$("input#cc-num").css("border-color","#5e97b0");
			$("input#cc-num").css("border-width", "thin");   	
		}	
	}	
});

/* Credit card zip number correction and elimination of conditional messages and bold red border */
$("input#zip").on('change', (e) => {
	if ($("#payment option:selected").text() === "Credit Card") {
		if ($("input#zip").val().length === 5) {	
			$("button").disabled = false;
			$("p.wrongzip").hide();
			$("p.wrongcard").hide();
			$("p.wrongcvv").hide();
			$("input#zip").css("border-color","#5e97b0");
			$("input#zip").css("border-width", "thin");   	
		}	
	}	
});

/* Credit card cvv number correction and elimination of conditional messages and bold red border */
$("input#cvv").on('change', (e) => {
	if ($("#payment option:selected").text() === "Credit Card") {
		if ($("input#cvv").val().length === 3) {	
			$("button").disabled = false;
			$("p.wrongcvv").hide();	
			$("p.wrongzip").hide();
			$("p.wrongcard").hide();
			$("input#cvv").css("border-color","#5e97b0");
			$("input#cvv").css("border-width", "thin");   	
		}	
	}	
});