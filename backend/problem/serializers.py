from rest_framework import serializers
from .models import *


class problemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Problem
        fields = '__all__'


class ptagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ptag
        fields = '__all__'


class deviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'


class drecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drecord
        fields = '__all__'


class pcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Pcateory
        fields = '__all__'


class pgroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pgroup
        fields = '__all__'


class poprecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poprecord
        fields = '__all__'


class propcateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propcate
        fields = '__all__'


class propgroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propgroup
        fields = '__all__'


class proptagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proptag
        fields = '__all__'


class psourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Psource
        fields = '__all__'
