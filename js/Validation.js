function validateForm(formObj) {
	var textBoxes = getElements(formObj,"input","text");
	var checkBoxes = getElements(formObj,"input","checkbox");
	var radioButtons = getElements(formObj,"input","radio");
	var dropDownList = getElements(formObj,"select","select-one");
	var result = true;
	
	/*Validating Textboxes*/
	for(counter=0;counter<textBoxes.length;counter++) 	{
		result = validateElement(textBoxes[counter],true);
		if(!result) break;
	}
	
	return result;
}

function validateElement(element,showAlert) {
	var validForm = true;
	/*span tag to display error. I.E 8.0 does not support nextElementSibling */
	if(element.parentElement.nextSibling.nodeName=="#text")
		 spanElement = element.parentElement.nextElementSibling.children[0];
	else
		 spanElement = element.parentElement.nextSibling.children[0];
	/*Required textbox validation*/
	if(element.attributes["data-required"]!=null && element.value=="")
		return setError(element,spanElement,"data-errrequired",showAlert);
	/*Pattern textbox validation*/	
	if(element.attributes["data-pattern"]!=null){
		var regex = new RegExp(element.attributes["data-pattern"].value,"i");
		if(!regex.test(element.value))
			return setError(element,spanElement,"data-errpattern",showAlert);
	}
	/*Maxlength Validation*/	
	if(element.attributes["data-maxlength"]!=null && element.value.length>parseInt(element.attributes["data-maxlength"].value))
		return setError(element,spanElement,"data-errmaxlength",showAlert);
	/*clear error messages*/		
	spanElement.innerText = "";
	return validForm;
}

function getElements(formObj,tagName,type){
	var elements = formObj.getElementsByTagName(tagName);
	var typeElements = [];
	var size = elements.length;
	for(counter=0;counter<size;counter++){
		if(elements[counter].type == type)
			typeElements.push(elements[counter]);
	}
	return typeElements;
}

function setError(element,spanElement,attr,showAlert){
	var errMsg = element.attributes[attr].value;
	if(showAlert)
		alert(errMsg);
	else
		spanElement.innerText = errMsg;
	element.focus();
	element.value = "";
	return false;
}