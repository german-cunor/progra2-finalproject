from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name = "home"),
    path("admin", views.admin, name = "admin"),

    path("send_message", views.sendMessage, name = "send_message"),
    path("load_message", views.loadMessage, name = "load_message"),
    path("remove_message", views.removeMessage, name = "remove_message"),

    path("request_appointment", views.requestAppointment, name = "request_appointment"),
    path("show_appointment", views.showAppointments, name = "show_appointment"),
    path("load_appointment", views.loadAppointment, name = "load_appointment"),
    path("save_appointment", views.saveAppointment, name = "save_appointment"),

    path("get_requests", views.getRequestAppointment, name = "get_requests"), 
    path("remove_request", views.removeAppointment, name = "remove_request"),

    path("add_patient", views.addPatient, name = "add_patient"),
    path("accept_patient", views.acceptPatient, name = "accept_patient"),
    path("get_patients", views.getPatients, name = "get_patients"),
    path("remove_patient", views.removePatient, name = "remove_patient"),
    
    path("get_doctors", views.getDoctors, name = "get_doctors"),
    path("get_doctor_list", views.getDoctorList, name = "get_doctor_list"),
    path("remove_doctor", views.removeDoctor, name = "remove_doctor"),
    path("save_doctor", views.saveDoctor, name = "save_doctor"),
    path("add_doctor", views.addDoctor, name = "add_doctor"),
]