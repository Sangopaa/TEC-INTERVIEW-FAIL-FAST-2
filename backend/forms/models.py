from django.db import models


class Form(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Rule(models.Model):
    EVENT_CHOICES = [
        ("onChange", "On Change"),
        ("onBlur", "On Blur"),
        ("onFocus", "On Focus"),
        ("onClick", "On Click"),
        ("onInit", "On Init"),
    ]

    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="rules")
    event = models.CharField(max_length=20, choices=EVENT_CHOICES)
    field = models.CharField(max_length=50, blank=True)
    code = models.TextField()  # JavaScript code
    enabled = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return f"{self.form.name} - {self.event} - {self.field or 'global'}"


class PersonSubmission(models.Model):
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    complete_name = models.CharField(max_length=200)
    document = models.CharField(max_length=50)
    birth_date = models.DateField()
    age = models.CharField(max_length=3)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    married = models.BooleanField(default=False)
    spouse_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.complete_name} - {self.document}"
