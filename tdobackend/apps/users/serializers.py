from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'groups'
        ]
        read_only_fields = ['id']
