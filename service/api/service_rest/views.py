from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from encoders import AutomobileVOEncoder, TechnicianDetailEncoder
from .models import Technician, AutomobileVO
import json


from common.json import ModelEncoder
# Create your views here.

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
