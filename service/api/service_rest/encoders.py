import json
from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["color", "year", "vin", "model"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["id", "vehicle_vin", "owner", "appointment_date", "appointment_time", "technician", "appointment_reason", "appointment_finish", "is_vip"]
    encoders = {
        "technician": TechnicianEncoder()
    }
