from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *


class problemView(ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = problemSerializer


class ptagView(ModelViewSet):
    queryset = Ptag.objects.all()
    serializer_class = ptagSerializer


class deviceView(ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = deviceSerializer


class drecordView(ModelViewSet):
    queryset = Drecord.objects.all()
    serializer_class = drecordSerializer


class pcategoryView(ModelViewSet):
    queryset = Pcateory.objects.all()
    serializer_class = pcategorySerializer


class pgroupView(ModelViewSet):
    queryset = Pgroup.objects.all()
    serializer_class = pgroupSerializer


class poprecordView(ModelViewSet):
    queryset = Poprecord.objects.all()
    serializer_class = poprecordSerializer


class propcateView(ModelViewSet):
    queryset = Poprecord.objects.all()
    serializer_class = poprecordSerializer


class propgroupView(ModelViewSet):
    queryset = Pgroup.objects.all()
    serializer_class = pgroupSerializer


class proptagView(ModelViewSet):
    queryset = Proptag.objects.all()
    serializer_class = proptagSerializer


class psourceView(ModelViewSet):
    queryset = Psource.objects.all()
    serializer_class = psourceSerializer
