from forms.serializers.person import PersonSubmissionSerializer

from rest_framework import status
from rest_framework.response import Response

from django.http import HttpRequest


class PersonSubmissionService:

    def __init__(self):
        self.serializer = PersonSubmissionSerializer

    def create_person_submission(self, data: dict) -> Response:
        new_person = self.serializer(data=data)
        if new_person.is_valid():
            new_person.save()
            return Response(new_person.data, status=status.HTTP_201_CREATED)
        return Response(new_person.errors, status=status.HTTP_400_BAD_REQUEST)
