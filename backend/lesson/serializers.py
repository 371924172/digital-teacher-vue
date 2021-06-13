from rest_framework import serializers
from .models import *


class classSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'


class collegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = '__all__'


class lessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'


class majorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'


class organizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'


class selclassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Selclass
        fields = '__all__'


class studentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class teacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'


class instructSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruct
        fields = '__all__'
