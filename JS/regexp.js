/*
* Library created by Niidhogg
* Date: 16/03/2012
* Regular expression for forms
*/

//true if the string contain only numbers
function nregx_isNumberOnly(word)
{
	var exp = new RegExp("^[0-9]+$","");
	return exp.test(word);
}

//true if the string contain only letters
function nregx_isLetterOnly(word)
{
	var exp = new RegExp("^[a-z\- ]+$","i");
	return exp.test(word);
}

//true if the string contain only numbers or/and letters
function nregx_isLetterOrNumberOnly(word)
{
	var exp = new RegExp("^[a-zA-Z0-9_-]+$","");
	return exp.test(word);
}

//true if the string is a mail address
function nregx_isMailAddr(word)
{
	var exp = new RegExp("^[a-zA-Z0-9_\-]{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{3,5}$","i");
	return exp.test(word);
}

//true if the string size is in the interval [nbrOfCharMin, nbrOfCharMax]
function nregx_isLenght(word, nbrOfCharMin, nbrOfCharMax)
{
	var motif = "^.{"+nbrOfCharMin+","+nbrOfCharMax+"}$";
	var exp = new RegExp(motif, "");
	return exp.test(word);
}