from django.contrib import admin
from clinic.models import User, RequestAppointment, Doctor, Patient, Appointment, Message

admin.site.register(User)
admin.site.register(RequestAppointment)
admin.site.register(Doctor)
admin.site.register(Patient)
admin.site.register(Appointment)
admin.site.register(Message)
