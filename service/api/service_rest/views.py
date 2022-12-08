from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .encoders import AutomobileVOEncoder, TechnicianEncoder, ServiceAppointmentEncoder
from .models import Technician, AutomobileVO, ServiceAppointment
import json


# Create your views here.

@require_http_methods(["GET"])
def list_appointments(request, vin_id=None):
    if request.method == "GET":
        if vin_id is not None:
            appointments = ServiceAppointment.objects.filter(vehicle_vin=vin_id)
        else:
            appointments = ServiceAppointment.objects.all()
        return JsonResponse (
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            vin = AutomobileVO.objects.get(vin=vin_id)
            content["vin"] = vin
        except AutomobileVO.DoesNotExist:
            return JsonResponse (
                {"message": "Invalid vin"},
                status=400,
            )
        return JsonResponse (
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder
        )

@require_http_methods(["POST"])
def create_appointment(request):
    if request.method == "POST":
        content = json.loads(request.body)
        appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False
        )

@require_http_methods(["GET", "DELETE"])
def show_appointment(request, pk):
    if request.method == "GET":
        appointment = ServiceAppointment.objects.get(id=pk)
        return JsonResponse(
            appointment,
            encoder=ServiceAppointmentEncoder,
            safe=False,
        )
    else:
        count, _ = ServiceAppointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET"])
def list_technicians(request):
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False,
        )

@require_http_methods(["GET"])
def show_technician(request, pk):
    if request.method == "GET":
        technician = Technician.objects.get(id=pk)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
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

@require_http_methods(["GET"])
def vehicle_appointment_history(request, vin):
    if request.method == "GET":
        appointments = ServiceAppointment.objects.filter(vehicle_vin=vin)
        return JsonResponse (
            {"appointments": appointments},
            encoder=ServiceAppointmentEncoder
        )
