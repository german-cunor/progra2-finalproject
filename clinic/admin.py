from django.contrib import admin
from clinic.models import User, RequestAppointment, Doctor

admin.site.register(User)
admin.site.register(RequestAppointment)
admin.site.register(Doctor)