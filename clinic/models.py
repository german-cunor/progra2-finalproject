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
    birdthdate = models.DateField()
    reason = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

class Patient(models.Model):
    name = models.CharField(max_length = 50)
    dpi = models.IntegerField()
    phone = models.IntegerField()
    direction = models.CharField(max_length = 500)
    birdthdate = models.DateField()
    others = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    dpi = models.IntegerField()
    doctor_membership = models.IntegerField()
    date = models.DateField()
    time = models.TimeField()
    reason = models.CharField(max_length = 1000)
    prescription = models.CharField(max_length = 1000)
    diagnostic = models.CharField(max_length = 1000)

    def __str__(self):
        return str(self.date) + ' / ' + str(self.dpi)

class Doctor(models.Model):
    name = models.CharField(max_length = 50)
    membership = models.IntegerField()
    specialty = models.CharField(max_length = 50)
    others = models.CharField(max_length = 1000)

    def __str__(self):
        return self.name

class Message(models.Model):
    name = models.CharField(max_length = 50)
    contact = models.CharField(max_length = 200)
    message = models.CharField(max_length = 1000)

    def __str__(self):
        return str(self.id)
