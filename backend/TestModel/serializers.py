from rest_framework import serializers
from .models import Test, Tag


class TestInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'


class TagInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'