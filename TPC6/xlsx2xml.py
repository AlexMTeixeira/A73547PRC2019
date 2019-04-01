#!/usr/local/bin/python3

import pandas as pd
file_path = 'freguesias-metadata.xlsx'
df = pd.read_excel(file_path, encoding='utf-8')

district = df.to_dict()['distrito'];
concelho = df.to_dict()['concelho'];
freg = df.to_dict()['freguesia'];

distVal = district.get(0)
distList = [0]

for x in district:
    if(distVal!=district[x]):
         distVal = district[x]
         distList.append(x)


concVal = concelho.get(0)
concList = [0]

for x in concelho:
    if(concVal!=concelho[x]):
         concVal = concelho[x]
         concList.append(x)


print("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")
print("<localities>")
print("<distritos>")
for x in distList:
    print("<distrito>")
    print("<designacao>"+district[distList[x]]+"</designacao>")
    print("<concelhos>")
    for y in concList:
        if(len(distList)==x-1 or concList[y]>=distList[x+1]):
            break
        print("<conselho>")
        print("<designacao>"+concelho[concList[y]]+"</designacao>")
        print("<freguesias>");
        for z in freg:
            if(len(concList)==y-1 or z>=concList[y+1]):
                break
            print("<freguesia>")
            print("<designacao>"+freg[z]+"</designacao>")
            print("</freguesia>")
        print("</freguesias>")
    print("</concelhos>")
    print("</distrito>")
print("<distritos>")
print("</localities>")
