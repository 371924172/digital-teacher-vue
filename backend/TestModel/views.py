from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Test
from .serializers import TestInfoSerializers
# Create your views here.

class TestInfo(ModelViewSet):
    queryset = Test.objects.all()

    serializer_class = TestInfoSerializers