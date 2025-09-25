from django.core.management.base import BaseCommand
from forms.models import Form, Rule


class Command(BaseCommand):
    help = 'Load sample rules for testing'

    def handle(self, *args, **options):
        # Crear formulario de ejemplo
        form, created = Form.objects.get_or_create(
            name="Person Form",
            defaults={
                'description': 'Dynamic person form with validation rules'
            }
        )

        # Limpiar reglas existentes
        Rule.objects.filter(form=form).delete()

        # Reglas de ejemplo
        rules = [
            {
                'event': 'onChange',
                'field': 'name',
                'code': '''
                const lastName = getFieldValue('last_name');
                if (lastName) {
                    setFieldValue('complete_name', value + ' ' + lastName);
                }
                ''',
                'order': 1
            },
            {
                'event': 'onChange',
                'field': 'last_name',
                'code': '''
                const name = getFieldValue('name');
                if (name) {
                    setFieldValue('complete_name', name + ' ' + value);
                }
                ''',
                'order': 2
            },
            {
                'event': 'onChange',
                'field': 'birth_date',
                'code': '''
                if (value) {
                    const today = new Date();
                    const birthDate = new Date(value);
                    if (birthDate > today) {
                        setFieldError('birth_date', 'Birth date cannot be in the future');
                        return;
                    }
                    const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
                    setFieldValue('age', age.toString());
                }
                ''',
                'order': 3
            },
            {
                'event': 'onChange',
                'field': 'married',
                'code': '''
                if (value) {
                    setFieldEnabled('spouse_name', true);
                    setFieldVisible('spouse_name', true);
                } else {
                    setFieldEnabled('spouse_name', false);
                    setFieldVisible('spouse_name', false);
                    setFieldValue('spouse_name', '');
                }
                ''',
                'order': 4
            },
            {
                'event': 'onBlur',
                'field': 'email',
                'code': '''
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    setFieldError('email', 'Please enter a valid email address');
                } else {
                    setFieldError('email', '');
                }
                ''',
                'order': 5
            }
        ]

        for i, rule_data in enumerate(rules):
            Rule.objects.create(
                form=form,
                event=rule_data['event'],
                field=rule_data['field'],
                code=rule_data['code'],
                enabled=True,
                order=rule_data['order']
            )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {len(rules)} sample rules')
        )