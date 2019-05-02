const http = require('http')

const server = http.createServer((request, response)=>{
  console.log('Servidor acessado!')

//  const headers = request.headers
//  const method = request.method
//  const url = request.url

//  console.log('Headers')
//  console.log(headers)
//  console.log("Method:	"	+	method);
//  console.log("URL:	"	+	url)

if(request.url == '/teste'){
  response.setHeader('Content-type', 'text/html')
  response.end('<h1>Olá Mundo</h1>')
}

if	(request.url	==	'/json')	{
   response.setHeader('Content-type',	'application/json');
   const	data	=	{	id:	1,	name:	"user"		};
   response.end(JSON.stringify(data));
}

})


server.listen(3000)
