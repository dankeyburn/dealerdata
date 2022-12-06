from common.json import ModelEncoder
from .models import AutomobileVO, Technician, ServiceAppointment

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["closet_name", "bin_size", "bin_number", "import_href"]

class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number"]


class ServiceAppointmentEncoder(ModelEncoder):
    model = ServiceAppointment
    properties = ["vehicle_vin", "appointment_datetime", "appointment_reason", "customer_name", "assigned_technician"]
    encoders = {
        "assigned_technician": TechnicianDetailEncoder()
    }
