from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .encoders import AutomobileVOEncoder, TechnicianDetailEncoder, ServiceAppointmentEncoder
from .models import Technician, AutomobileVO, ServiceAppointment
import json


from common.json import ModelEncoder
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
def create_technician(request):
    if request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(
            technician,
            encoder=TechnicianDetailEncoder,
            safe=False,
        )
