from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse
from clinic.models import User, RequestAppointment, Doctor, Patient, Appointment, Message

def home(request):
    return render(request, "index.html")

def sendMessage(request):
    message = Message(
        name = request.POST["nameMessage"],
        contact = request.POST["contactMessage"],
        message = request.POST["message"]);
    message.save()

    return render(request, "index.html")

def loadMessage(request):
    messages = Message.objects.all();

    if len(messages) > 0:
        html_fragment = render_to_string('messageFragment.html', {'messages': messages})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def removeMessage(request):
    message = Message.objects.get(id = request.POST["m_id"])
    message.delete()

    return loadMessage(request)

def requestAppointment(request):
    req = RequestAppointment(
        name = request.POST["namePatient"],
        dpi = request.POST["dpiPatient"],
        phone = request.POST["noPhone"],
        birdthdate = request.POST["birdthdate"],
        reason = request.POST["reasonPatient"])
    try:
        ovr = RequestAppointment.objects.get(dpi = req.dpi)
        ovr.name = req.name
        ovr.phone = req.phone
        ovr.birdthdate = req.birdthdate
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

def loadAppointment(request):
    appointment = Appointment.objects.get(id = request.POST["a_id"]);
    patient = Patient.objects.get(dpi = appointment.dpi)
    try:
        doctor = Doctor.objects.get(membership = appointment.doctor_membership)
    except:
        doctor = Doctor(
            name = "No registrado",
            membership="0000")

    html_fragment = render_to_string('appointmetnFragment.html', {'appointment': appointment, "patient": patient, "doctor": doctor})
    return HttpResponse(html_fragment)

def saveAppointment(request):
    appointment = Appointment.objects.get(id=request.POST["a_id"])
    appointment.prescription = request.POST["prescription"]
    appointment.diagnostic = request.POST["diagnostic"]
    appointment.save()

def showAppointments(request):
    appointments = Appointment.objects.filter(dpi = request.POST["dpi"])
    return render(request, "history.html", {'appointments': appointments})    

def getPatients(request):
    patients = Patient.objects.all()
    if len(patients) > 0:
        html_fragment = render_to_string('patientFragment.html', {'patients': patients})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def acceptPatient(request):
    reqP = RequestAppointment.objects.get(dpi = request.POST["dpi"])
    patient = Patient(
        name = reqP.name,
        dpi = reqP.dpi,
        phone = reqP.phone,
        birdthdate = reqP.birdthdate,
        others = request.POST["other"]
    )

    appointment = Appointment(
        dpi = reqP.dpi,
        doctor_membership = request.POST["doctor"],
        date = request.POST["date"],
        time = request.POST["time"],
        reason = reqP.reason
    )
    appointment.save()

    try:
        ePatient = Patient.objects.get(dpi = request.POST["dpi"])
        ePatient.name = patient.name
        ePatient.phone = patient.phone
        ePatient.birdthdate = patient.birdthdate
        ePatient.others = patient.others
        ePatient.save()
    except:
        patient.save()

    return removeAppointment(request)

def addPatient(request):
    patient = Patient(
        name = request.POST["name"],
        dpi = request.POST["dpi"],
        phone = request.POST["noPhone"],
        birdthdate = request.POST["birdthdate"],
        others = request.POST["other"]
    )

    appointment = Appointment(
        dpi = request.POST["dpi"],
        doctor_membership = request.POST["doctor"],
        date = request.POST["date"],
        time = request.POST["time"],
        reason = request.POST["reason"]
    )
    appointment.save()

    try:
        ePatient = Patient.objects.get(dpi = request.POST["dpi"])
        ePatient.name = patient.name
        ePatient.phone = patient.phone
        ePatient.birdthdate = patient.birdthdate
        ePatient.others = patient.others
        ePatient.save()
    except:
        patient.save()

    return getPatients(request)

def removePatient(request):
    patient = Patient.objects.get(dpi = request.POST["dpi"])

    Appointment.objects.filter(dpi = patient.dpi).delete()

    patient.delete()

    return getPatients(request)

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

def saveDoctor(request):
    doctor = Doctor.objects.get(id = request.POST["d_id"])
    doctor.name = request.POST["name"]
    doctor.specialty = request.POST["specialty"]
    doctor.others = request.POST["other"]
    doctor.save()

def removeDoctor(request):
    doctor = Doctor.objects.get(membership = request.POST["membership"])
    doctor.delete()
    doctors = Doctor.objects.all();

    if len(doctors) > 0:
        html_fragment = render_to_string('doctorFragment.html', {'doctors': doctors})
    else:
        html_fragment = render_to_string('empty.html')

    return HttpResponse(html_fragment)

def addDoctor(request):
    doctor = Doctor(
        name = request.POST["name"],
        membership = request.POST["membership"],
        specialty = request.POST["specialty"],
        others = request.POST["other"]
    )

    try:
        dovr = Doctor.objects.get(membership = doctor.membership)
        dovr.name = doctor.name
        dovr.specialty = doctor.specialty
        dovr.others = doctor.others
        dovr.save()
    except:
        doctor.save()
    return getDoctors(request)

def admin(request):
    try:
        name = request.POST["name"]
        password = request.POST["password"]

        user = User.objects.get(name = name)
        if  user.password == password:
            return render(request, "admin.html",{"user_name":user.user_name})
        else:
            return render(request, "index.html")
    except:
        return render(request, "index.html")