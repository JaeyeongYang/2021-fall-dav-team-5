from app.models import Menu, Recipe
import django
import csv
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")


django.setup()

CSV_PATH = './data.csv'


def value_or_none(x):
    return x if x and x != '' else None


# TODO: implement this function
def parse_ingredients(ingredient_text):
    ret = list()
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

        # For now, ignore parsing and storing ingredients
        if True:
            continue

        # Parse the raw ingredient text into a list of ingredient strings
        # TODO: implement parse_ingredients
        ingredients = parse_ingredients(row['RCP_PARTS_DTLS'])

        for ing in ingredients:
            ing = Ingredient.objects.get_or_create(name=ing)
            ing.menus.add(menu)
