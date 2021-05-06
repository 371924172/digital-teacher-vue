from TestModel.serializers import *
from TestModel.models import *


t = Test.objects.get(id=3)
test = TestInfoSerializers(t).data

tag = TagInfoSerializers(Tag.objects.all(),many=True).data