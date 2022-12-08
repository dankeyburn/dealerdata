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
    properties = ["id", "vehicle_vin", "appointment_datetime", "appointment_reason", "owner", "technician"]
    encoders = {
        "technician": TechnicianEncoder()
    }
