from forms.serializers.rule import RuleSerializer
from forms.models import Rule

from rest_framework import status
from rest_framework.response import Response


class RulesService:

    def get_rules(self, form_id: str) -> Response:
        """
        Logic to retrieve rules for a given form_id
        """

        rules = Rule.objects.filter(form_id=form_id, enabled=True).order_by(
            "order", "created_at"
        )

        if not rules.exists():
            return Response(
                {"error": "No rules found for the given form_id."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = RuleSerializer(rules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
