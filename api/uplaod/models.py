from django.db import models

class CsvFile(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=100)
  data = models.TextField()
  time = models.DateTimeField(null=True)

  def __str__(self):
    return self.data

