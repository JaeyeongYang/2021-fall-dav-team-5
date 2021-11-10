from django.db.models import Count
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Menu
from .serializers import SimpleMenuSerializer, DetailedMenuSerializer


def filter_contains(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    value = request.query_params.get(param_name)

    if value is not None and value != '':
        queryset = queryset.filter(**{f'{field_name}__contains': value})

    return queryset


def filter_multiple_contains(queryset, request, field_name, param_name=None):
    if param_name is None:
        param_name = field_name

    values = request.query_params.get(param_name)

    if values is not None:
        for value in values.split(','):
            if value != '':
                queryset = queryset.filter(**{f'{field_name}__contains': value})

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


class MainViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = Menu.objects.all()

        queryset = filter_contains(queryset, request, 'name')
        queryset = filter_contains(queryset, request, 'way')
        queryset = filter_contains(queryset, request, 'pat')
        queryset = filter_min_max(queryset, request, 'energy')
        queryset = filter_min_max(queryset, request, 'carb')
        queryset = filter_min_max(queryset, request, 'protein')
        queryset = filter_min_max(queryset, request, 'fat')
        queryset = filter_min_max(queryset, request, 'na')
        queryset = filter_contains(queryset, request, 'hashtags')
        queryset = filter_multiple_contains(queryset, request, 'ingredients')

        serializer = SimpleMenuSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Menu.objects.all()
        menu = get_object_or_404(queryset, pk=pk)
        serializer = DetailedMenuSerializer(menu)
        return Response(serializer.data)


class OptionViewSet(viewsets.ViewSet):
    @method_decorator(cache_page(5))
    def list(self, request):
        queryset = Menu.objects.all()

        ways = queryset.values_list('way').annotate(count=Count('way'))
        pats = queryset.values_list('pat').annotate(count=Count('pat'))
        hashtags = queryset.values_list('hashtag').annotate(count=Count('hashtag'))
        # ingredients = queryset.values_list('ingredients', flat=True)

        return Response({
            'way': ways,
            'pat': pats,
            'hashtag': hashtags,
            # 'ingredients': ingredients,
        })
