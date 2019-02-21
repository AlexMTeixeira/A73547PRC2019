#!/usr/local/bin/python3

import sys, json

jfile = open("prize.json")

data = json.load(jfile)
jfile.close()

output = open("out.ttl","w")

for val in data:
    ident = val["category"]+val["year"]
    output.write('###  http://prc2019.di.uminho.pt/2019/Prize#'+ident+"\n")
    output.write(':'+ident+' rdf:type owl:NamedIndividual , :Prize ;\n')
    output.write('    :category     "'+ val["category"]+'" ;\n')
    if 'overallMotivation' in val:
        output.write('    :overallMotivation     '+ val["overallMotivation"]+' ;\n')
    
    for laureate in val["laureates"]:
        output.write('    :hasLaureate  :L'+laureate["id"]+" ;\n")
    output.write('    :year     '+ val["year"]+" .\n\n")

for val in data:
    for l in val["laureates"]:
        output.write('###  http://prc2019.di.uminho.pt/2019/Prize#L'+l["id"]+"\n")
        output.write(':L'+l["id"]+' rdf:type owl:NamedIndividual , :Laureate ;\n')
        output.write('    :firstname     "'+ l["firstname"]+'" ;\n')
        output.write('    :surname     "'+ l["surname"]+'" ;\n')
        if 'motivation' in l:
            output.write('    :motivation     '+ l["motivation"]+' ;\n')
        output.write('    :share    '+l["share"]+' .\n\n')
 
output.close()
print("Json to Turtle DONE")
