from django.db import models


class Menu(models.Model):
    name = models.CharField(max_length=200, verbose_name='메뉴명')
    way = models.CharField(max_length=100, verbose_name='조리방법')
    pat = models.CharField(max_length=100, verbose_name='조리종류')

    weight = models.PositiveSmallIntegerField(verbose_name='1인당 중량')
    energy = models.PositiveSmallIntegerField(verbose_name='열량')

    carb = models.PositiveSmallIntegerField(verbose_name='탄수화물')
    protein = models.PositiveSmallIntegerField(verbose_name='단백질')
    fat = models.PositiveSmallIntegerField(verbose_name='지방')
    na = models.PositiveSmallIntegerField(verbose_name='나트륨')

    hashtag = models.CharField(max_length=100, verbose_name='해시태그')

    img_small = models.URLField(verbose_name='이미지경로(소)')
    img_large = models.URLField(verbose_name='이미지경로(대)')

    ingredients = models.TextField(verbose_name='재료정보')


class Recipe(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE,
                             verbose_name='조리메뉴')
    order = models.PositiveSmallIntegerField(verbose_name='순서')
    text = models.TextField(verbose_name='만드는 법')
    img = models.URLField(verbose_name='이미지경로')
