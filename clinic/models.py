from django.db import models

class User(models.Model):
    name = models.CharField(max_length = 50)
    password = models.CharField(max_length = 20)
    user_name = models.CharField(max_length = 50)

    def __str__(self):
        return self.name

class RequestAppointment(models.Model):
    name = models.CharField(max_length = 50)
    dpi = models.IntegerField()
    phone = models.IntegerField()
    reason = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length = 50)
    membership = models.IntegerField()
    specialty = models.CharField(max_length = 50)
    others = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name