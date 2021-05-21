from rest_framework.viewsets import ModelViewSet
from .models import Problem, Ptag
from .serializers import ProblemSerializers, PtagSerializers


class ProblemView(ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializers


class PtagView(ModelViewSet):
    queryset = Ptag.objects.all()
    serializer_class = PtagSerializers
