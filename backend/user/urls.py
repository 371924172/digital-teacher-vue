from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.routers import DefaultRouter
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^authenticated/$', obtain_jwt_token),
    url(r'^register/(?P<username>\w)/exist/', views.LoginAndRegisterView.as_view({'get': 'exist '})),
    url(r'^getInfo/(?P<pk>\w)', views.LoginAndRegisterView.as_view({'get': 'retrieve'}))
]

router = DefaultRouter()
router.register(r'users', views.UserView)
urlpatterns += router.urls
