from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .encoders import AutomobileVOEncoder, TechnicianEncoder, ServiceAppointmentEncoder
from .models import Technician, AutomobileVO, ServiceAppointment
import json


# Create your views here.

@require_http_methods(["GET"])
def list_appointments(request):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.all()
        return JsonResponse (
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder
        )

@require_http_methods(["POST"])
def create_appointment(request):
    if request.method == "POST":
        content = json.loads(request.body)
        print(content)
        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def list_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["POST"])
def create_technician(request):
    if request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )
