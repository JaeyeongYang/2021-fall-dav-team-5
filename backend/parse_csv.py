import csv
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

import django

django.setup()
from app.models import Menu, Recipe

CSV_PATH = './data.csv'


def value_or_none(x):
    return x if x and x != '' else None


with open(CSV_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for i, row in enumerate(reader):
        Menu.objects.get_or_create(
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
            ingredients=row['RCP_PARTS_DTLS']
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
