import csv
import os
import re

def value_or_none(x):
    return x if x and x != '' else None


CSV_PATH='data.csv'

with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for i, row in enumerate(reader):
        ingredients=row['RCP_PARTS_DTLS']
        ingredients=[ing.strip() for ing in re.split('[\n\r,:->]',ingredients) if ing]
        parsed_ingredients=list()
        # print(ingredients)
        for ing in ingredients:
            ing=ing.replace("("," (").replace("  "," ").replace("또는",',')
            parsed_ing=list()
            for w in ing.split():
                w=w.replace("약간","0").replace("큰","0").replace("작은","0").replace("가능","0").replace("적당","0").replace("채친","0").replace("다진","0").replace("부순","0")
                int_i=re.search('[0-9]',w)
                if w[0]=='(' or w[-1]==')' or w[0]=='[' or w[0]=='-' or w[-1]==']':
                    continue
                if w=='재료' or w=='g' or 'br' in w or '/' in w:
                    continue
                if int_i and int_i.start()!=0 and w[int_i.start()-1]!='(':
                    parsed_ing.append(w[:int_i.start()])
                    continue              
                    
                if int_i or not w:
                    continue
                else:
                    parsed_ing.append(w)

            parsed_ing_joined=" ".join([p for p in parsed_ing])
            if parsed_ing and parsed_ing_joined!="주재료":
                parsed_ingredients.append(parsed_ing_joined)

        print(row['RCP_NM'],parsed_ingredients)