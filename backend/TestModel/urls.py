from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = []

router = DefaultRouter()
router.register(r'test', views.TestInfo)
router.register(r're', views.TagInfo)
urlpatterns += router.urls
