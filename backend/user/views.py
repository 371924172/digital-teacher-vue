from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import AllowAny
from .utils import is_superuser
from .serializers import UserSerializers
from .models import User
from rest_framework import mixins


# 注册
class LoginAndRegisterView(mixins.CreateModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializers

    def exist(self, request, username):
        count = User.objects.filter(username=username).count()
        data = {
            "username": username,
            "count": count
        }
        return Response(data)


# 用户管理
class UserView(ModelViewSet):
    permission_classes = (is_superuser,)
    queryset = User.objects.all()
    serializer_class = UserSerializers

