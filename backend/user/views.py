from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import AllowAny
from .utils import is_superuser
from .serializers import UserSerializer
from .models import User
from rest_framework import mixins
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate


# 注册登录相关
class UserProfileView(mixins.CreateModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['post'], detail=False)
    def exist(self, request):
        username = request.data['username']
        print(username)
        count = User.objects.filter(username=username).count()
        data = {
            "username": username,
            "count": count
        }
        return Response(data)

    @action(methods=['put'], detail=False)
    def changePassword(self, request):
        data = request.data
        user = request.user
        credentials = {
            'username': user.username,
            'password': data['oldpassword']
        }
        if authenticate(**credentials):
            newpassword = {
                'password': data['newpassword']
            }
            UserSerializer.changePassword(self, newpassword, request)
            return Response(status=200)
        return Response(data)


# 用户管理
class UserView(ModelViewSet):
    permission_classes = (is_superuser,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def update(self, request, *args, **kwargs):
        data = request.data
        print(data)
        return Response(data)

    @action(methods=['put'], detail=False)
    def permission(self, request):
        data = request.data
        for user in data:
            User.objects.filter(id=user['id']).update(is_superuser=user['is_superuser'])
        return Response(data)

    @action(methods=['get'], detail=False)
    def unchecked(self, request):
        userList = User.objects.filter(status="FALSE")
        print(userList)
        serializer = UserSerializer(userList, many=True)
        return Response(serializer.data)

    @action(methods=['post'], detail=False)
    def check(self, request):
        data = request.data
        for user in data:
            User.objects.filter(id=user['id']).update(status=user['status'])
        return Response(data)
