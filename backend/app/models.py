from django.db import models


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
    # ingredients_set as ManyToManyField
    ingredients_count = models.PositiveIntegerField(
        verbose_name='메뉴 카운트', editable=False, default=None,
    )

    def save(self, *args, **kwargs):
        # if self.ingredients_count is None:
        #     self.ingredients_count = 0
        # else:
        self.ingredients_count = self.ingredients_set.count()

        super().save(*args, **kwargs)


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


class Ingredient(models.Model):
    id = models.BigAutoField(verbose_name='Ingredients ID', primary_key=True)
    name = models.CharField(
        max_length=200, verbose_name='재료명',
        null=False, blank=False, unique=True,
    )
    menus = models.ManyToManyField(Menu, related_name='ingredients_set')
    count = models.PositiveIntegerField(
        verbose_name='메뉴 카운트', editable=False, default=None,
    )

    class Meta:
        ordering = ['name']

    def save(self, *args, **kwargs):
        if self.count is None:
            self.count = 0
        else:
            self.count = self.menus.count()

        super().save(*args, **kwargs)
