from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse
from clinic.models import User, RequestAppointment, Doctor

from django.views.decorators.csrf import csrf_protect

def home(request):
    return render(request, "index.html")

def requestAppointment(request):
    req = RequestAppointment(
        name = request.POST["namePatient"],
        dpi = request.POST["dpiPatient"],
        phone = request.POST["noPhone"],
        reason = request.POST["reasonPatient"])
    try:
        ovr = RequestAppointment.objects.get(dpi = req.dpi)
        ovr.name = req.name
        ovr.phone = req.phone
        ovr.reason = req.reason
        ovr.save()
    except:
        req.save()

    return render(request, "index.html")

def getRequestAppointment(request):
    reqs = RequestAppointment.objects.all()
    if len(reqs) > 0:
        html_fragment = render_to_string('requestFragment.html', {'request_appointment': reqs})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def removeAppointment(request):
    req = RequestAppointment.objects.get(dpi = request.POST["dpi"])
    req.delete()
    reqs = RequestAppointment.objects.all();

    if len(reqs) > 0:
        html_fragment = render_to_string('requestFragment.html', {'request_appointment': reqs})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def getDoctors(request):
    doctors = Doctor.objects.all()
    if len(doctors) > 0:
        html_fragment = render_to_string('doctorFragment.html', {'doctors': doctors})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def getDoctorList(request):
    doctors = Doctor.objects.all()
    html_fragment = render_to_string('doctorList.html', {'doctors': doctors})

    return HttpResponse(html_fragment)

def removeDoctor(request):
    doctor = Doctor.objects.get(membership = request.POST["membership"])
    doctor.delete()
    doctors = Doctor.objects.all();

    if len(doctors) > 0:
        html_fragment = render_to_string('doctorFragment.html', {'doctors': doctors})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def admin(request):
    name = request.POST["name"]
    password = request.POST["password"]
    
    try:
        user = User.objects.get(name = name)
        if  user.password == password:
            return render(request, "admin.html",{"user_name":user.user_name})
        else:
            return render(request, "index.html")
    except:
        return render(request, "index.html")