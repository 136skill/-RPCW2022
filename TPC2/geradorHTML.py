import json

#páginas filmes
filmes = json.load(open("./cinemaATP.json",encoding="utf-8"))

i=1
c=1
for item in filmes:
    f = open("./html/f" + str(i) + ".html", "w",encoding="utf-8")
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
    f.write(f'''<a href= ../filmes> Voltar à página principal </a>''')
    f.write('</div>')
    f.write('''</body>
</html>''')
    c += 1


#Index
t = open("./html/index.html", "w",encoding="utf-8")
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


#Atores
dic = {}
i = 1
for obj in filmes:
    for at in obj['cast']:
        dic.setdefault(at, []).append(obj['title'])

sort_keys = dic.items()
new_items = sorted(sort_keys)


i = 1
c = 1
for ator in dic:
    f = open("./htmlAtores/a" + str(i) + ".html", "w",encoding="utf-8")
    i += 1
    f.write(f'''<!DOCTYPE html>\n
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>{ator}</title>

</head>
<body>
    <div class="w3-container w3-margin-left">''')
    f.write(f'<p><b>Ator:{ator}</b></p>')
    f.write('<p><b>Filmes em que participa:</b></p>')
    f.write('<ol>')
    for cas in dic[ator]:
        f.write('<li>'+ cas +'</li>')
    f.write('</ol>')
    f.write('</div>')
    f.write('''</body>
</html>''')

#Lista Atores
t = open("./htmlAtores/atores.html", "w",encoding="utf-8")
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

for ator in dic:
    t.write(f'''<p><a href=./atores/a{i}> {ator} </a></p>''')
    i += 1

t.write('''</div>
</body>
</html>''')



    












