from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Test, Tag
from .serializers import TestInfoSerializers, TagInfoSerializers


# Create your views here.

class TestInfo(ModelViewSet):
    queryset = Test.objects.all()

    serializer_class = TestInfoSerializers


class TagInfo(ModelViewSet):
    queryset = Tag.objects.all()

    serializer_class = TagInfoSerializers
