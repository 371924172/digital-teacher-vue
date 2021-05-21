from rest_framework import serializers
from .models import User


class UserSerializers(serializers.ModelSerializer):
    # repassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'is_active', 'is_superuser', 'is_staff']

    def create(self, validated_data):
        # del validated_data['repassword']
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
