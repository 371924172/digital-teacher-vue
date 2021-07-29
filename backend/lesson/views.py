from rest_framework.viewsets import GenericViewSet, ModelViewSet
from .serializers import *
from .models import *


class classView(ModelViewSet):
    queryset = Class.objects.all()
    serializer_class = classSerializer


class collegeView(ModelViewSet):
    queryset = College.objects.all()
    serializer_class = collegeSerializer


class lessonView(ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = lessonSerializer


class majorView(ModelViewSet):
    queryset = Major.objects.all()
    serializer_class = majorSerializer


class organizationView(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = organizationSerializer


class selclassView(ModelViewSet):
    queryset = Selclass.objects.all()
    serializer_class = selclassSerializer


class studentView(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = studentSerializer


class instructView(ModelViewSet):
    queryset = Instruct.objects.all()
    serializer_class = instructSerializer
