import json

filmes = json.load(open("./teste.json",encoding="utf-8"))

i=1
c=1
for item in filmes:
    f = open("./html/f" + str(i) + ".html", "w")
    i += 1
    f.write(f'''<!DOCTYPE html>\n
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Filme: {c}</title>

</head>
<body>
    <div class="w3-container w3-margin-left">
    <p> <b> Filme: </b>{item['title']}</p>
    <p> <b> Ano:</b>{item['year']}</p>''')
    j=0
    f.write('<b>Elenco:</b>')
    f.write('<ol>')
    for cas in item['cast']:
        f.write('<li>'+ cas +'</li>')
    f.write('</ol>')
    f.write('<b>Género:</b>')
    f.write('<ol>')
    for gen in item['genres']:
        f.write('<li>'+ gen +'</li>')
    f.write('<ol>')
    f.write(f'''<a href= ../filmes> Voltar a página principal </a>''')
    f.write('</div>')
    f.write('''</body>
</html>''')
    c += 1

t = open("./html/index.html", "w")
i = 1

t.write(f'''<!DOCTYPE html>\n
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title> Filmes </title>
</head>
<body>
<div class="w3-container w3-margin-left">''')

for titulo in filmes:
    t.write(f'''<p><a href=./filmes/f{i}> {titulo['title']} </a></p>''')
    i += 1

t.write('''</div>
</body>
</html>''')










