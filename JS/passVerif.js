/*
* CSS created by Niidhogg
* Date: 16/03/2012
* function for verifying pass score
*/

function passwordScore(pass)
{
	var score = 2;
	var i = 0;
	
	var exp = new RegExp("[a-z]", "");
	if(exp.test(pass))
	{
		i++;
		score+=i*pass.length;
	}
	
	exp.compile("[A-Z]");
	if(exp.test(pass))
	{
		i++;
		score+=i*pass.length;
	}
	
	exp.compile("[0-9]");
	if(exp.test(pass))
	{
		i++;
		score+=i*pass.length;
	}
	
	exp.compile("[_\W]");
	if(exp.test(pass))
	{
		i++;
		score+=i*pass.length;
	}
	
	return score;
}