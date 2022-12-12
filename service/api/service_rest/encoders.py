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

    def get_extra_data(self, o):
        appointment_date = json.dumps(o.appointment_date, default=str)
        appointment_time = json.dumps(o.appointment_time, default=str)
        appointment_date = json.loads(appointment_date)
        appointment_time = json.loads(appointment_time)
        return {
            "appointment_date": appointment_date,
            "appointment_time": appointment_time,
        }
