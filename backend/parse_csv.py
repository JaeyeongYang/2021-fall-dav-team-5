import django
import csv
import os
import re

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()
from app.models import Menu, Recipe, Ingredient

CSV_PATH = './data.csv'


def value_or_none(x):
    return x if x and x != '' else None


# TODO: implement this function
def parse_ingredients(ingredient_text):
    ret = list()

    ingredients=[ing.strip() for ing in re.split('[\n\r,:->]',ingredient_text) if ing]
    ret=list()
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
            ret.append(parsed_ing_joined)

    return ret  # list of ingredients names


with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    for i, row in enumerate(reader):
        menu = Menu.objects.get_or_create(
            id=row['RCP_SEQ'],
            name=value_or_none(row['RCP_NM']),
            way=value_or_none(row['RCP_WAY2']),
            pat=value_or_none(row['RCP_PAT2']),
            energy=row['INFO_ENG'],
            carb=row['INFO_CAR'],
            protein=row['INFO_PRO'],
            fat=row['INFO_FAT'],
            na=row['INFO_NA'],
            hashtag=value_or_none(row['HASH_TAG']),
            img_small=row['ATT_FILE_NO_MAIN'],
            img_large=row['ATT_FILE_NO_MK'],
            ingredients=row['RCP_PARTS_DTLS'],
        )

        for i in range(1, 21):
            if len(row[f'MANUAL{i:02d}']) == 0:
                break

            Recipe.objects.get_or_create(
                menu_id=row['RCP_SEQ'],
                order=i,
                text=row[f'MANUAL{i:02d}'],
                img=row[f'MANUAL_IMG{i:02d}']
            )

        # Parse the raw ingredient text into a list of ingredient strings
        # TODO: implement parse_ingredients
        ingredients = parse_ingredients(row['RCP_PARTS_DTLS'])

        for ing in ingredients:
            ing = Ingredient.objects.get_or_create(name=ing)[0]
            ing.menus.add(menu[0])
