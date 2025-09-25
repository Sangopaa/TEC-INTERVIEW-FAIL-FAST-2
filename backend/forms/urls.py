from django.urls import path
from .views import RulesView, PersonSubmissionView

urlpatterns = [
    path("rules/<str:form_id>/", RulesView.as_view(), name="form_rules"),
    path("person/", PersonSubmissionView.as_view(), name="person_submission"),
]
