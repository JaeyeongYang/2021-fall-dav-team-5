from django.db import models
from django.dispatch import receiver


class Ingredient(models.Model):
    id = models.BigAutoField(verbose_name='Ingredients ID', primary_key=True)
    name = models.CharField(
        max_length=200, verbose_name='재료명',
        null=False, blank=False, unique=True,
    )
    count = models.PositiveIntegerField(
        verbose_name='메뉴 수', default=0, editable=False,
    )

    class Meta:
        ordering = ['name']


class Menu(models.Model):
    id = models.BigAutoField(verbose_name='Menu ID', primary_key=True)

    name = models.CharField(max_length=200, verbose_name='메뉴명',
                            null=False, blank=False)
    way = models.CharField(max_length=100, verbose_name='조리방법',
                           null=True, blank=False)
    pat = models.CharField(max_length=100, verbose_name='조리종류',
                           null=True, blank=False)

    energy = models.FloatField(verbose_name='열량')

    carb = models.FloatField(verbose_name='탄수화물')
    protein = models.FloatField(verbose_name='단백질')
    fat = models.FloatField(verbose_name='지방')
    na = models.FloatField(verbose_name='나트륨')

    hashtag = models.CharField(max_length=100, verbose_name='해시태그',
                               null=True, blank=False)

    img_small = models.URLField(verbose_name='이미지경로(소)')
    img_large = models.URLField(verbose_name='이미지경로(대)')

    ingredients = models.TextField(verbose_name='재료정보')
    ingredients_parsed = models.TextField(
        verbose_name='파싱된 재료정보', null=False, blank=True, default='',
    )
    ingredients_set = models.ManyToManyField(
        Ingredient,
        related_name='menus',
        through='Requirement',
        through_fields=('menu', 'ingredient'),
    )
    ingredients_count = models.PositiveIntegerField(
        verbose_name='재료 수', default=0, editable=False,
    )


class Requirement(models.Model):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)


class Recipe(models.Model):
    id = models.BigAutoField(verbose_name='Recipe ID', primary_key=True)

    menu = models.ForeignKey(
        Menu, verbose_name='조리메뉴',
        related_name='recipes',
        on_delete=models.CASCADE,
    )
    order = models.PositiveSmallIntegerField(verbose_name='순서')
    text = models.TextField(verbose_name='만드는 법')
    img = models.URLField(verbose_name='이미지경로')


@receiver(models.signals.post_init, sender=Requirement)
def increment_count(sender, instance, **kwargs):
    menu = instance.menu
    menu.ingredients_count += 1
    menu.save()

    ing = instance.ingredient
    ing.count += 1
    ing.save()


@receiver(models.signals.pre_delete, sender=Requirement)
def increment_count(sender, instance, **kwargs):
    menu = instance.menu
    menu.ingredients_count -= 1
    menu.save()

    ing = instance.ingredient
    ing.count -= 1
    ing.save()
