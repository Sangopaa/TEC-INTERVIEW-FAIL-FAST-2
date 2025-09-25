from rest_framework import serializers
from forms.models import Rule


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = ["id", "event", "field", "code", "enabled", "order"]
