import csv
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

import django
django.setup()
from django.db import models
from app.models import Menu, Recipe


CSV_PATH='data.csv'
recipe_count=1

with open(CSV_PATH, newline='',encoding='utf-8') as csvfile:
    reader=csv.DictReader(csvfile)
    for i, row in enumerate(reader):
        Menu.objects.get_or_create(
            id=row['RCP_SEQ'],

            name=row['RCP_NM'],
            way=row['RCP_WAY2'],
            pat=row['RCP_PAT2'],

            energy=row['INFO_ENG'],

            carb=row['INFO_CAR'],
            protein=row['INFO_PRO'],
            fat=row['INFO_FAT'],
            na=row['INFO_NA'],

            hashtag=row['HASH_TAG'],

            img_small=row['ATT_FILE_NO_MAIN'],
            img_large=row['ATT_FILE_NO_MK'],

            ingredients=row['RCP_PARTS_DTLS']
            )

        for i in range(1,21):
            if len(row['MANUAL%02d' %(i)])==0:
                break

            Recipe.objects.get_or_create(
                id=recipe_count,
                menu_id=row['RCP_SEQ'],
                order=i,
                text=row['MANUAL%02d' %(i)],
                img=row['MANUAL_IMG%02d' %(i)]
                )
            recipe_count+=1
