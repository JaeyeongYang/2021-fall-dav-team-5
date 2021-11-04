from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import Menu, Recipe


class MenuSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Menu
        fields = [
            'name', 'way', 'pat', 'weight', 'energy',
            'carb', 'protein', 'fat', 'na',
            'hashtag', 'img_small', 'img_large',
            'ingredients',
        ]


class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            'menu', 'order', 'text', 'img',
        ]
