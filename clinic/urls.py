from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name = "home"),
    path("admin", views.admin, name = "admin"),
    path("request_appointment", views.requestAppointment, name = "request_appointment"),
    path("get_requests", views.getRequestAppointment, name = "get_requests"),
    path("remove_request", views.removeAppointment, name = "remove_request"),
    
    path("get_doctors", views.getDoctors, name = "get_doctors"),
    path("get_doctor_list", views.getDoctorList, name = "get_doctor_list"),
    path("remove_doctor", views.removeDoctor, name = "remove_doctor"),
]