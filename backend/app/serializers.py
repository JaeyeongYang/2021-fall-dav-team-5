from rest_framework import serializers

from .models import Menu, Recipe


class SimpleMenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = [
            'id', 'name', 'way', 'pat', 'energy',
            'carb', 'protein', 'fat', 'na',
            'hashtag', 'img_small', 'img_large',
        ]


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['order', 'text', 'img']


class DetailedMenuSerializer(serializers.ModelSerializer):
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = Menu
        fields = [
            'id', 'name', 'way', 'pat', 'energy',
            'carb', 'protein', 'fat', 'na',
            'hashtag', 'img_small', 'img_large',
            'ingredients', 'recipes',
        ]
