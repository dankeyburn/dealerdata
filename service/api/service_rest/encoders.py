from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["color", "year", "vin", "model"]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["vehicle_vin", "appointment_datetime", "appointment_reason", "owner", "assigned_technician"]
    encoders = {
        "assigned_technician": TechnicianEncoder()
    }
