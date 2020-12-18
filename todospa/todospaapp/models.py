from django.db import models


class TodoItem(models.Model):
    text = models.CharField(max_length=200)
    date_created = models.DateTimeField()
    date_completed = models.DateTimeField(null=True, blank=True)

    def is_completed(self):
        return self.date_completed is not None
    
    def __str__(self):
        return self.text



