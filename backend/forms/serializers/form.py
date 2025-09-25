from rest_framework import serializers
from forms.models import Form
from forms.serializers.rule import RuleSerializer


class FormSerializer(serializers.ModelSerializer):
    rules = RuleSerializer(many=True, read_only=True)

    class Meta:
        model = Form
        fields = ["id", "name", "description", "rules"]
