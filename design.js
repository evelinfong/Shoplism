
function onloadDump() {
	var oReq = new XMLHttpRequest();
	var url = "http://138.68.25.50:10967/query?op=dump";
	
		function reqListener() {
			var dataArray = JSON.parse(this.responseText);
			addPhotosToDOM(dataArray);
		}
		var oReq = new XMLHttpRequest();
		oReq.addEventListener("load", reqListener);
		oReq.open("GET", url);
		oReq.send();
}


function addPhotosToDOM(dataArray) {

	for (var i = 0; i < dataArray.length; i++) { //dataArray.length; i++) {
		
		var uploadedImg = document.createElement("IMG");//.innerHTML; //("IMG");
		uploadedImg.setAttribute("src", dataArray[i].fileName);
		uploadedImg.setAttribute("width", "200");
		uploadedImg.setAttribute("height", "200");
       		uploadedImg.setAttribute("position", "absolute");
	
		// starting here is and below is same as uploading
		var picDiv = document.createElement('div');
		picDiv.className = "picDiv";
		picDiv.id = i;
		var overlay = document.createElement('div');
		overlay.className = "overlay";

		var image = document.createElement('img');
		image.className = "images";
		var hamburgerIcon = document.createElement('img');
		hamburgerIcon.className = "hamburgerIcon";
		hamburgerIcon.src = "./photobooth/optionsTriangle.png";
		var OptionPanel = document.createElement('div');
		OptionPanel.className = "OptionPanel";
	
		overlay.appendChild(image);
		overlay.appendChild(OptionPanel);
		overlay.appendChild(hamburgerIcon);

		picDiv.appendChild(overlay);
		picDiv.appendChild(uploadedImg);
		document.getElementById('imageAndLabelDiv').appendChild(picDiv);	

		

		//dumped labels start here
		console.log(dataArray[i].labels);
		var dumpLabelsDiv = document.createElement("div");
		dumpLabelsDiv.className = "dumpLabelsDiv";
		dumpLabelsDiv.setAttribute("style", "border: solid;");
		var dumpLabels = document.createElement("p");

//remove icon starts here
//each div is singleLabel
		var labelString = dataArray[i].labels;
		var labelList = labelString.split(",");
//		list starts at index 1 because comma in front of string
		var labelListLen = labelList.length;
		for(var j = 1; j < labelListLen; j++)
		{
			var singleLabel = document.createElement("div");
			singleLabel.setAttribute("style", "display:flex; flex-direction:row-reverse;");	
			var xIcon = document.createElement("input");
			xIcon.type = "image";
			xIcon.src = "./photobooth/removeTagButton.png";
			xIcon.classname ="xIcon";
			xIcon.setAttribute("style", "width:15px; height: 15px;");		

			singleLabel.className = "singleLabel";  
			singleLabel.textContent = labelList[j];
			dumpLabelsDiv.appendChild(singleLabel);
//			singleLabel.appendChild(xIcon);


		}
		dumpLabelsDiv.appendChild(dumpLabels);
		picDiv.appendChild(dumpLabelsDiv);
		
	
	}
// up to here, above is the same as uploading to imageAndLabelDiv (beige), imageAndAddTags (red)
}

function uploadMenu() {
	var uploadContainer = document.createElement("div");
	uploadContainer.id = "uploadContainer";
	uploadContainer.setAttribute("style", "display: flex; flex-direction: column; background-color: #CFBBB2 ;margin-top: 10px; margin-bottom: 10px; align-self: stretch; justify-content: center; padding-left: 15px; min-height: 20%;");		
	var fileSelector_upload = document.createElement("input");
	fileSelector_upload.setAttribute("type", "file");
	fileSelector_upload.id = "fileSelector_upload";
	console.log("file name is this");
	uploadContainer.appendChild(fileSelector_upload);
//	console.log(fileSelector_upload.files[0].name);	

	var uploadButton = document.createElement("button");
	var t = document.createTextNode("upload");
	uploadButton.appendChild(t);
	
	uploadContainer.appendChild(uploadButton);
	document.getElementById("upload1").appendChild(uploadContainer);
	
	uploadButton.onclick = uploadFile(fileSelector_upload);
/*                <div id="upload2" style="display: flex; flex-direction: column; margin-top:10px; margin-bottom: 10px; align-self: stretch; justify-content: center; padding-left: 15px; min-height: 20%">
                       
		 <input type="file" id="fileSelector_upload" style="display:flex; flex-direction: column; padding: 10px;">

                <button id="uploadButton" style="width: 30%; cursor: pointer;" onclick="uploadFile()">upload</button>
                </div>
*/
//}
	
function uploadFile(fileSelector_upload) {
	

	var gReq = new XMLHttpRequest();
	var gurl = "http://138.68.25.50:12461/query?op=googleAPI";
	
		function greqListener() {
			var gdataArray = JSON.parse(this.responseText);
			annotateImage(gdataArray);
		}
		var gReq = new XMLHttpRequest();
		gReq.addEventListener("load", greqListener);
		gReq.open("GET", gurl);
		gReq.send();



	var url = "http://138.68.25.50:12461";
//	var selectedFile = document.getElementById('fileSelector_upload').files[0];
	var jpgFile = fileSelector_upload.files[0].name;//document.getElementById('fileSelector_upload').files[0].name;
	
	console.log(selectedFile);
	var formData = new FormData();
	formData.append("userfile", selectedFile);
	var oReq = new XMLHttpRequest();
	oReq.open("POST", url, true);
	oReq.onload = function() {	
		console.log("inside onload in Upload");
		console.log(oReq.responseText);
	}
	oReq.send(formData);




	var uploadedImg = document.createElement("IMG");//.innerHTML; //("IMG");
   		var fr = new FileReader();
    		fr.onload = function () {
	    		uploadedImg.src = fr.result; //image.src = fr.result;
		};
    		fr.readAsDataURL(selectedFile);    // begin reading
	
	uploadedImg.setAttribute("src", uploadedImg.src);
	uploadedImg.setAttribute("width", "200");
	uploadedImg.setAttribute("height", "200");
        uploadedImg.setAttribute("position", "absolute");

	var picDiv = document.createElement('div');
	picDiv.className = "picDiv";
	var overlay = document.createElement('div');
	overlay.className = "overlay";

	var image = document.createElement('img');
	image.className = "images";
	var hamburgerIcon = document.createElement('img');
	hamburgerIcon.className = "hamburgerIcon";
	hamburgerIcon.src = "./photobooth/optionsTriangle.png";
	var OptionPanel = document.createElement('div');
	OptionPanel.className = "OptionPanel";
	
	overlay.appendChild(image);
	overlay.appendChild(OptionPanel);
	overlay.appendChild(hamburgerIcon);

	picDiv.appendChild(overlay);
	picDiv.appendChild(uploadedImg);

	document.getElementById('imageAndLabelDiv').appendChild(picDiv);	

	hamburgerIcon.onclick = function() {
		var changetag = document.createElement("button");
		changetag.className = "changeTags";
		changetag.textContent = "change tags";	
		picDiv.appendChild(changetag);

		changetag.onclick = function() {
			//dumped labels start here
		var dumpLabelsDiv = document.createElement("div");
		dumpLabelsDiv.className = "dumpLabelsDiv";
		dumpLabelsDiv.setAttribute("style", "border: solid;");
		var dumpLabels = document.createElement("p");
		//dumpLabelsDiv.textContent = addBtnInput.value;
		dumpLabelsDiv.appendChild(dumpLabels);
		picDiv.appendChild(dumpLabelsDiv);
	
//from seven.js	
		        var addBox = document.createElement("div");
                        var addBtnInput = document.createElement("input");
                        addBtnInput.type = "text";
                        addBox.appendChild(addBtnInput);
                        var labelBox = document.createElement("div");
                        var addBtn = document.createElement("button");
			addBtn.className = "addBtn";

			  addBtn.onclick = function() {
                                console.log("click");
                                var url = "http://138.68.25.50:10967/query?op=add&img="+jpgFile+"&label="+addBtnInput.value;
                              

	              var singleLabel = document.createElement("div");
                        singleLabel.setAttribute("style", "display:flex; flex-direction:row-reverse;");
                        var xIcon = document.createElement("input");
                        xIcon.type = "image";
                        xIcon.src = "./photobooth/removeTagButton.png";
                        xIcon.classname ="xIcon";
                        xIcon.setAttribute("style", "width:15px; height: 15px;");

                        singleLabel.className = "singleLabel";
                        singleLabel.textContent = addBtnInput.value;
                        dumpLabelsDiv.appendChild(singleLabel);
                        singleLabel.appendChild(xIcon);
	
				picDiv.appendChild(dumpLabelsDiv);
					
                                function reqListener() {
                                        console.log("inside reqList");
                                        var pgh = addBtnInput.value;
                                        pgh = this.reponseText;
                                }
                                var oReq = new XMLHttpRequest();
                                oReq.addEventListener("load", reqListener);
                                oReq.open("GET", url);
                                oReq.send();
                                 xIcon.onclick = function() {
                                console.log("singleLabel.textcontent" + singleLabel.textContent);
                                dumpLabelsDiv.removeChild(singleLabel);
                        }

			}
		
			var btnText = document.createTextNode("Add to list");
                        addBtn.appendChild(btnText);

//end of copy
			picDiv.appendChild(addBox);
			picDiv.appendChild(addBtn);
		}
	}	

}
}//end of uploadFile anonymous function


function mobileUpload() {


        var addInput = document.createElement("input");
        addInput.type = "file";
        var mobileUpDiv = document.getElementById("mobileUploadFile");
        mobileUpDiv.appendChild(addInput);
        var addMoBut = document.createElement("button");
        addMoBut.id ="uploadButtonMobile";
        addMoBut.textContent = "upload";
        mobileUpDiv.appendChild(addMoBut);

        addMoBut.onclick = function() {
	
	var url = "http://138.68.25.50:10967";
	var selectedFile = addInput.files[0];
	var jpgFile = selectedFile.name;
	
	console.log(selectedFile);
	var formData = new FormData();
	formData.append("userfile", selectedFile);
	var oReq = new XMLHttpRequest();
	oReq.open("POST", url, true);
	oReq.onload = function() {	
		console.log("inside onload in Upload");
		console.log(oReq.responseText);
	}
	oReq.send(formData);

	var uploadedImg = document.createElement("IMG");//.innerHTML; //("IMG");
   		var fr = new FileReader();
    		fr.onload = function () {
	    		uploadedImg.src = fr.result; //image.src = fr.result;
		};
    		fr.readAsDataURL(selectedFile);    // begin reading
	
	uploadedImg.setAttribute("src", uploadedImg.src);
	uploadedImg.setAttribute("width", "200");
	uploadedImg.setAttribute("height", "200");
        uploadedImg.setAttribute("position", "absolute");

	var picDiv = document.createElement('div');
	picDiv.className = "picDiv";
	var overlay = document.createElement('div');
	overlay.className = "overlay";

	var image = document.createElement('img');
	image.className = "images";
	var hamburgerIcon = document.createElement('img');
	hamburgerIcon.className = "hamburgerIcon";
	hamburgerIcon.src = "./photobooth/optionsTriangle.png";
	var OptionPanel = document.createElement('div');
	OptionPanel.className = "OptionPanel";
	
	overlay.appendChild(image);
	overlay.appendChild(OptionPanel);
	overlay.appendChild(hamburgerIcon);

	picDiv.appendChild(overlay);
	picDiv.appendChild(uploadedImg);

	document.getElementById('imageAndLabelDiv').appendChild(picDiv);	

	hamburgerIcon.onclick = function() {
		var changetag = document.createElement("button");
		changetag.className = "changeTags";
		changetag.textContent = "change tags";	
		picDiv.appendChild(changetag);

		changetag.onclick = function() {
			//dumped labels start here
		var dumpLabelsDiv = document.createElement("div");
		dumpLabelsDiv.className = "dumpLabelsDiv";
		dumpLabelsDiv.setAttribute("style", "border: solid;");
		var dumpLabels = document.createElement("p");
		//dumpLabelsDiv.textContent = addBtnInput.value;
		dumpLabelsDiv.appendChild(dumpLabels);
		picDiv.appendChild(dumpLabelsDiv);
	
//from seven.js	
		        var addBox = document.createElement("div");
                        var addBtnInput = document.createElement("input");
                        addBtnInput.type = "text";
                        addBox.appendChild(addBtnInput);
                        var labelBox = document.createElement("div");
                        var addBtn = document.createElement("button");
			addBtn.className = "addBtn";
			  

			addBtn.onclick = function() {
                                console.log("click");
                                var url = "http://138.68.25.50:10967/query?op=add&img="+jpgFile+"&label="+addBtnInput.value;
                              

	              var singleLabel = document.createElement("div");
                        singleLabel.setAttribute("style", "display:flex; flex-direction:row-reverse;");
                        var xIcon = document.createElement("input");
                        xIcon.type = "image";
                        xIcon.src = "./photobooth/removeTagButton.png";
                        xIcon.classname ="xIcon";
                        xIcon.setAttribute("style", "width:15px; height: 15px;");

                        singleLabel.className = "singleLabel";
                        singleLabel.textContent = addBtnInput.value;
                        dumpLabelsDiv.appendChild(singleLabel);
                        singleLabel.appendChild(xIcon);
	
				picDiv.appendChild(dumpLabelsDiv);
					
                                function reqListener() {
                                        console.log("inside reqList");
                                        var pgh = addBtnInput.value;
                                        pgh = this.reponseText;
                                }
                                var oReq = new XMLHttpRequest();
                                oReq.addEventListener("load", reqListener);
                                oReq.open("GET", url);
                                oReq.send();
                                 xIcon.onclick = function() {
                                console.log("singleLabel.textcontent" + singleLabel.textContent);
                                dumpLabelsDiv.removeChild(singleLabel);
                        }

			}

			var btnText = document.createTextNode("Add to list");
                        addBtn.appendChild(btnText);

//end of copy
			picDiv.appendChild(addBox);
			picDiv.appendChild(addBtn);
		}
	}	
}

}
