<html>  
<head>  
 <script src="js/jquery.js" type="text/javascript"></script>  
 <script type="text/javascript">  
  $().ready(function() {  
   $('#add').click(function() {  
    return !$('#select1 option:selected').remove().appendTo('#select2');  
   });  
   $('#remove').click(function() {  
    return !$('#select2 option:selected').remove().appendTo('#select1');  
   });  
  });  
 </script>  

 <style type="text/css">  
  a {  
   display: block;  
   border: 1px solid #aaa;  
   text-decoration: none;  
   background-color: #fafafa;  
   color: #123456;  
   margin: 2px;  
   clear:both;  
  }  
  div {  
   float:left;  
   text-align: center;  
   margin: 10px;  
  }  
  select {  
   width: 100px;  
   height: 80px;  
  }  
 </style>  

</head>  

<body>  
 <div>  
  <select multiple id="select1">  
   <option value="1">Option 1</option>  
   <option value="2">Option 2</option>  
   <option value="3">Option 3</option>  
   <option value="4">Option 4</option>  
  </select>  
  <a href="#" id="add">add &gt;&gt;</a>  
 </div>  
 <div>  
  <select multiple id="select2"></select>  
  <a href="#" id="remove">&lt;&lt; remove</a>  
 </div>  
</body>  
</html> 