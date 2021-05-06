from django.db import models


# Create your models here.
class Test(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)
    relation = models.CharField(max_length=20)


class Tag(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20)

