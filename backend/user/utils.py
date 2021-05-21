from rest_framework.permissions import BasePermission


# 自定义权限管理
class is_superuser(BasePermission):
    def has_permission(self, request, view):
        # 获取当前登陆用户
        user = request.user
        # 如果未登录，返回False --> 无权限
        return bool(user.is_superuser)


# 重写jwt的登录视图的构造相应数据函数，追加userid和username
def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'userid': user.id,
        'is_superuser': user.is_superuser
    }
