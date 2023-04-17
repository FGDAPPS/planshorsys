Formulaire dynamique--------------------
Url     : http://codes-sources.commentcamarche.net/source/54155-formulaire-dynamiqueAuteur  : NiidhoggDate    : 05/08/2013
Licence :
=========

Ce document intitulé « Formulaire dynamique » issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis à disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fixées par la licence, tant que cette note
apparaît clairement.

Description :
=============

Un simple formulaire adaptable qui r&eacute;agis selon les donn&eacute;e entrer

<br />NB: La fonction passwordScore(pass) n'est pas tr&egrave;s pr&eacute;cise,
 c'&eacute;tais pas mon but initial
<br /><a name='source-exemple'></a><h2> Sou
rce / Exemple : </h2>
<br /><pre class='code' data-mode='basic'>
&lt;!DOCTYPE
 html&gt;
&lt;html lang=&quot;fr&quot;&gt;
    &lt;head&gt;
		
        &lt;m
eta charset=&quot;utf-8&quot; /&gt;
        &lt;title&gt;Formulaire actif&lt;/t
itle&gt;
		&lt;script src=&quot;JS/regexp.js&quot;&gt;&lt;/script&gt;
		&lt;sc
ript src=&quot;JS/passVerif.js&quot;&gt;&lt;/script&gt;
		&lt;script src=&quot;
JS/forms.js&quot;&gt;&lt;/script&gt;
		&lt;link rel=&quot;stylesheet&quot; href
=&quot;CSS/forms.css&quot; /&gt;
		&lt;link rel=&quot;stylesheet&quot; href=&qu
ot;CSS/design.css&quot; /&gt;
		
		&lt;script&gt;
			//Change the color of th
e bar
			function change(id, val)
			{
				if(val == 0)
					document.getEle
mentById(id).style.backgroundColor = &quot;#dd0000&quot;;
				else if(val == 1)

					document.getElementById(id).style.backgroundColor = &quot;#70b500&quot;;

				else
					document.getElementById(id).style.backgroundColor = &quot;#ffc50
0&quot;;
			}
		&lt;/script&gt;
		
    &lt;/head&gt;
	
    &lt;body&gt;
	
	
		&lt;form method=&quot;post&quot; action=&quot;&quot;&gt;
			&lt;h2&gt;Form
ulaire: &lt;/h2&gt;
			
			&lt;div class=&quot;p&quot;&gt;
				&lt;label for=
&quot;pseudo&quot;&gt;Pseudo: &lt;/label&gt;&lt;input type=&quot;text&quot; name
=&quot;pseudo&quot; id=&quot;pseudo&quot; onchange='nform_alphaNum(pseudo.value,
 change, &quot;verPseudo&quot;)' /&gt;
					&lt;div id=&quot;verPseudo&quot; cl
ass=&quot;zoneVerif&quot;&gt;&lt;/div&gt;&lt;br /&gt;
				&lt;label for=&quot;m
dp&quot;&gt;Mot de passe: &lt;/label&gt;&lt;input type=&quot;password&quot; name
=&quot;mdp&quot; id=&quot;mdp&quot; onchange='nform_pass(mdp.value, change, &quo
t;verMdp&quot;)' /&gt;
					&lt;div id=&quot;verMdp&quot; class=&quot;zoneVerif
&quot;&gt;&lt;/div&gt;&lt;br /&gt;
				&lt;label for=&quot;mdp2&quot;&gt;Retape
z le mot de passe: &lt;/label&gt;&lt;input type=&quot;password&quot; name=&quot;
mdp2&quot; id=&quot;mdp2&quot; onchange='nform_passVerif(mdp.value, mdp2.value, 
change, &quot;verMdp2&quot;)' /&gt;
					&lt;div id=&quot;verMdp2&quot; class=&
quot;zoneVerif&quot;&gt;&lt;/div&gt;&lt;br /&gt;
				&lt;label for=&quot;mail&q
uot;&gt;Adresse email: &lt;/label&gt;&lt;input type=&quot;text&quot; name=&quot;
mail&quot; id=&quot;mail&quot; onchange='nform_mail(mail.value, change, &quot;ve
rMail&quot;)' /&gt;
					&lt;div id=&quot;verMail&quot; class=&quot;zoneVerif&q
uot;&gt;&lt;/div&gt;&lt;br /&gt;
			&lt;/div&gt;
				&lt;hr /&gt;
			&lt;div 
class=&quot;p&quot;&gt;
				&lt;label for=&quot;nom&quot;&gt;Nom: &lt;/label&gt
;&lt;input type=&quot;text&quot; name=&quot;nom&quot; id=&quot;nom&quot; onchang
e='nform_alpha(nom.value, change, &quot;verNom&quot;)' /&gt;
					&lt;div id=&q
uot;verNom&quot; class=&quot;zoneVerif&quot;&gt;&lt;/div&gt;&lt;br /&gt;
				&l
t;label for=&quot;cp&quot;&gt;Code postal: &lt;/label&gt;&lt;input type=&quot;te
xt&quot; name=&quot;cp&quot; id=&quot;cp&quot; onchange='nform_num(cp.value, cha
nge, &quot;verCp&quot;)' /&gt;
					&lt;div id=&quot;verCp&quot; class=&quot;zo
neVerif&quot;&gt;&lt;/div&gt;&lt;br /&gt;
			&lt;/div&gt;
		&lt;/form&gt;
		

		&lt;script&gt;
			var pseudo = document.getElementById(&quot;pseudo&quot;);

			var mdp = document.getElementById(&quot;mdp&quot;);
			var mdp2 = document.
getElementById(&quot;mpd2&quot;);
			var mail = document.getElementById(&quot;m
ail&quot;);
			var nom = document.getElementById(&quot;nom&quot;);
			var cp =
 document.getElementById(&quot;cp&quot;);
			
		&lt;/script&gt;
    &lt;/body
&gt;
&lt;/html&gt;
</pre>
