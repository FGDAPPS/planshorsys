/*
* Library created by Niidhogg
* Date: 16/03/2012
* Functions for forms
*/

//funct = function to call
function nform_pass(word, funct, id)
{
	if(nregx_isLenght(word, 8, 20))
	{
		var score = passwordScore(word);
		if(score >= 30)
			funct(id, 1);
		else funct(id, score);
	}
	else
		funct(id, 0);
}

//funct = function to call
function nform_passVerif(pass1, pass2, funct, id)
{
	if(pass1 == pass2)
		funct(id, 1);
	else
		funct(id, 0);
}

//funct = function to call
function nform_alphaNum(word, funct, id)
{
	if(nregx_isLetterOrNumberOnly(word) && nregx_isLenght(word, 2, 20))
		funct(id, 1);
	else
		funct(id, 0);
}

//funct = function to call
function nform_alpha(word, funct, id)
{
	if(nregx_isLetterOnly(word) && nregx_isLenght(word, 2, 30))
		funct(id, 1);
	else
		funct(id, 0);
}

//funct = function to call
function nform_num(word, funct, id)
{
	if(nregx_isNumberOnly(word) && nregx_isLenght(word, 2, 20))
		funct(id, 1);
	else
		funct(id, 0);
}

//funct = function to call
function nform_mail(word, funct, id)
{
	if(nregx_isMailAddr(word) && nregx_isLenght(word, 2, 20))
		funct(id, 1);
	else
		funct(id, 0);
}