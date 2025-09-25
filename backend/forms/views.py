from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.http import HttpRequest
from django.contrib.auth import get_user_model


from forms.services.rules import RulesService
from forms.services.person import PersonSubmissionService

User = get_user_model()


class RulesView(APIView):
    # permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.rules_service = RulesService()

    def get(self, request: HttpRequest, form_id: str) -> Response:
        return self.rules_service.get_rules(form_id)


class PersonSubmissionView(APIView):
    # permission_classes = [IsAuthenticated]

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.person_service = PersonSubmissionService()

    def post(self, request: HttpRequest) -> Response:
        return self.person_service.create_person_submission(request.data)
