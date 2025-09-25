from rest_framework import serializers
from forms.models import PersonSubmission


class PersonSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonSubmission
        fields = "__all__"
