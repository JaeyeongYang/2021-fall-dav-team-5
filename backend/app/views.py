from functools import reduce

from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Menu, Ingredient, Requirement
from .serializers import (
    SimpleMenuSerializer, DetailedMenuSerializer,
    SimpleIngredientSerializer, DetailedIngredientSerializer,
)


def filter_contains(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    value = request.query_params.get(param_name)

    if value is not None and value != '':
        queryset = queryset.filter(**{f'{field_name}__contains': value})

    return queryset


def filter_multiple_contains_or(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    values = request.query_params.get(param_name)

    if values is not None and values != '':
        query = reduce(lambda x, y: x | y, [
            Q(**{f'{field_name}__contains': v}) for v in values.split(',') if v != ''
        ])
        queryset = queryset.filter(query)

    return queryset


def filter_multiple_contains_and(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    values = request.query_params.get(param_name)

    if values is not None and values != '':
        query = reduce(lambda x, y: x & y, [
            Q(**{f'{field_name}__contains': v}) for v in values.split(',') if v != ''
        ])
        queryset = queryset.filter(query)

    return queryset


def filter_multiple_exclude_and(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    values = request.query_params.get(param_name)

    if values is not None and values != '':
        query = reduce(lambda x, y: x & y, [
            Q(**{f'{field_name}__contains': v}) for v in values.split(',') if v != ''
        ])
        queryset = queryset.exclude(query)

    return queryset


def filter_min_max(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    value_min = request.query_params.get(f'{param_name}_min')
    value_max = request.query_params.get(f'{param_name}_max')

    if value_min is not None:
        queryset = queryset.filter(**{f'{field_name}__gte': float(value_min)})
    if value_max is not None:
        queryset = queryset.filter(**{f'{field_name}__lte': float(value_max)})

    return queryset


def filter_ingredient_inc_exc(queryset, request, field_name='ingredients_set', param_name=None):
    if param_name is None:
        param_name = field_name

    values_inc = request.query_params.get(f'{param_name}_inc')
    values_exc = request.query_params.get(f'{param_name}_exc')

    if values_inc is not None and values_inc != '':
        id_inc = [int(x) for x in values_inc.split(',')]
        queryset = queryset.filter(ingredients_set__in=id_inc)

    if values_exc is not None and values_exc != '':
        id_exc = [int(x) for x in values_exc.split(',')]
        queryset = queryset.exclude(ingredients_set__in=id_exc)

    return queryset


class MainViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Menu.objects.all()

        queryset = filter_multiple_contains_and(queryset, request, 'name')
        queryset = filter_multiple_contains_or(queryset, request, 'way')
        queryset = filter_multiple_contains_or(queryset, request, 'pat')

        queryset = filter_min_max(queryset, request, 'energy')
        queryset = filter_min_max(queryset, request, 'carb')
        queryset = filter_min_max(queryset, request, 'protein')
        queryset = filter_min_max(queryset, request, 'fat')
        queryset = filter_min_max(queryset, request, 'na')

        queryset = filter_multiple_contains_and(queryset, request, 'hashtags')

        queryset = filter_ingredient_inc_exc(queryset, request, 'ingredients_set')
        queryset = filter_multiple_contains_and(queryset, request, 'ingredients', 'ingredients_inc')
        queryset = filter_multiple_exclude_and(queryset, request, 'ingredients', 'ingredients_exc')

        serializer = SimpleMenuSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Menu.objects.all()
        menu = get_object_or_404(queryset, pk=pk)
        serializer = DetailedMenuSerializer(menu)
        return Response(serializer.data)


class IngredientViewSet(viewsets.ViewSet):
    @method_decorator(cache_page(100))
    def list(self, request):
        queryset = Ingredient.objects.all()
        queryset = queryset.filter(count__gte=10)  # count >= 10
        serializer = SimpleIngredientSerializer(queryset, many=True)
        return Response(serializer.data)

    @method_decorator(cache_page(100))
    def retrieve(self, request, pk=None):
        queryset = Ingredient.objects.all()
        ing = get_object_or_404(queryset, pk=pk)
        serializer = DetailedIngredientSerializer(ing)
        return Response(serializer.data)


class OptionViewSet(viewsets.ViewSet):
    @method_decorator(cache_page(100))
    def list(self, request):
        queryset = Menu.objects.all()

        ways = queryset.values_list('way').annotate(count=Count('way'))
        pats = queryset.values_list('pat').annotate(count=Count('pat'))
        hashtags = queryset.values_list(
            'hashtag').annotate(count=Count('hashtag'))
        # ingredients = queryset.values_list('ingredients', flat=True)

        return Response({
            'way': ways,
            'pat': pats,
            'hashtag': hashtags,
            # 'ingredients': ingredients,
        })
