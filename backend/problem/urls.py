from rest_framework.routers import DefaultRouter
from . import views

urlpatterns = []

router = DefaultRouter()
router.register(r'problem', views.ProblemView)
router.register(r'ptag', views.PtagView)
urlpatterns += router.urls
