from rest_framework import viewsets
from rest_framework import permissions

from .models import Menu, Recipe
from .serializers import MenuSerializer, RecipeSerializer


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
