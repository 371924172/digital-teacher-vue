from rest_framework import serializers
from .models import Problem, Ptag


class ProblemSerializers(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'


class PtagSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ptag
        fields = '__all__'
