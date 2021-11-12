from rest_framework import serializers

from .models import Menu, Recipe, Ingredient


class SimpleMenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = [
            'id', 'name', 'way', 'pat', 'energy',
            'carb', 'protein', 'fat', 'na',
            'hashtag', 'img_small', 'img_large',
            'ingredients_count',
        ]


class SimpleIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'count']


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['order', 'text', 'img']


class DetailedMenuSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True, read_only=True)
    ingredients_set = SimpleIngredientSerializer(
        many=True, read_only=True)

    class Meta:
        model = Menu
        fields = [
            'id', 'name', 'way', 'pat', 'energy',
            'carb', 'protein', 'fat', 'na',
            'hashtag', 'img_small', 'img_large',
            'ingredients', 'ingredients_set',
            'recipes',
        ]


class DetailedIngredientSerializer(serializers.ModelSerializer):
    menus = SimpleMenuSerializer(many=True, read_only=True)

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'menus', 'count']
