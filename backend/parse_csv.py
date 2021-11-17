import csv
import os
import re

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")
django.setup()

from app.models import Menu, Recipe, Ingredient, Requirement  # nopep8

CSV_PATH = './data.csv'


def value_or_none(x):
    return x if x and x != '' else None


def parse_ingredients(ingredient_text):
    ret = list()
    ings = [
        ing.strip() for ing in re.split('[\n\r,:->]', ingredient_text) if ing
    ]

    for ing in ings:
        ing = ing.replace("(", " (").replace("  ", " ").replace("또는", ',')
        parsed_ing = list()

        for w in ing.split():
            w = (
                w.replace("약간", "0").replace("큰", "0").replace("작은", "0")
                    .replace("가능", "0").replace("적당", "0").replace("채친", "0")
                    .replace("다진", "0").replace("부순", "0")
            )

            int_i = re.search('[0-9]', w)

            if w[0] in ['(', '[', '-'] or w[-1] in [')', ']']:
                continue
            if w == '재료' or w == 'g' or 'br' in w or '/' in w:
                continue
            if int_i and int_i.start() != 0 and w[int_i.start() - 1] != '(':
                parsed_ing.append(w[:int_i.start()])
                continue

            if int_i or not w:
                continue
            else:
                parsed_ing.append(w)

        parsed_ing_joined = " ".join([p for p in parsed_ing])
        if parsed_ing and parsed_ing_joined != "주재료":
            ret.append(parsed_ing_joined)

    return ret  # list of ingredients names


def parse_ingredients_regex(ingredient_text):
    text = ingredient_text

    p_paren = re.compile(r'[(\[].+?[)\]]')
    text = p_paren.sub('\n', text)

    p_invalid = re.compile(r'[^ㄱ-ㅎ가-힣a-zA-Z0-9.,:\s]|["\'\-~/]')
    text = p_invalid.sub('\n', text)

    p_comma = re.compile(r'또는')
    text = p_comma.sub(',', text)

    p_misc = re.compile(r'(([ㄱ-ㅎ가-힣a-zA-Z0-9]*?재료)|strong|span|br)')
    text = p_misc.sub('', text)

    p_adverb = re.compile(r'약간|큰|작은|가는|간|갠|채친|채썬|다진|부순|삶은|갈은|데친|데쳐서|같은것|것')
    text = p_adverb.sub('', text)

    # '건 ' / '말린' / '말린 ' -> '건'
    p_dry = re.compile(r'건\s|말린\s?')
    text = p_dry.sub(r'건', text)

    p_amount = re.compile(r'(^|[\W\s])(각|각각|사방)?\s*([\d.]+\s?[ㄱ-ㅎ가-힣a-zA-Z0-9]+)')
    text = p_amount.sub(r'\g<1>\n', text)

    p_amount2 = re.compile(r'\s*[\d.]+[ ]?(g|ml|l|cm|m|mm|개)\s*')
    text = p_amount2.sub('\n', text)

    p_amount3 = re.compile(r'\s[\d.]+(,|$|\s)')
    text = p_amount3.sub('\n', text)

    p_colon = re.compile(r'(^|\n)\s*[ㄱ-ㅎ가-힣a-zA-Z0-9]+\s*:\s*')
    text = p_colon.sub('\n', text)

    p_yellow = re.compile(r'(노랑|노란|노란색)\s?')
    text = p_yellow.sub('노란', text)

    p_nutmeg = re.compile(r'넉멕|넉맥|넛멕')
    text = p_nutmeg.sub('넛맥', text)

    p_misc1 = re.compile(r'((곁들이채소|곁들임채소)\d*)')
    text = p_misc1.sub(',', text)

    p_sauce = re.compile(r'\s+소스\d?\s?')
    text = p_sauce.sub('\n', text)

    p_space = re.compile(r'[ ]+')
    text = p_space.sub(' ', text)

    p_split = re.compile(r'[\n\r,:->]')
    ings = [x.strip() for x in p_split.split(text)]

    blacklist_words = [
        '곁들임채소', '곁들이채소', '소스', '.', '',
    ]
    ings = list(set(filter(lambda x: x not in blacklist_words, ings)))

    return ings


with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)

    for i, row in enumerate(reader):
        # Parse the raw ingredient text into a list of ingredient strings
        ingredients = parse_ingredients_regex(row['RCP_PARTS_DTLS'])

        menu, _ = Menu.objects.get_or_create(
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
            ingredients_parsed=', '.join(ingredients),
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

        for ing in ingredients:
            ing, _ = Ingredient.objects.get_or_create(name=ing)

            Requirement.objects.get_or_create(menu=menu, ingredient=ing)
