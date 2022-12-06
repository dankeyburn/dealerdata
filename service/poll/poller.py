import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

# Import models from service_rest, here.
# from service_rest.models import Something
from service_rest.models import ServiceAppointment

def poll():
    while True:
        print('Service poller polling for data')
        try:
            # Write your polling logic, here
            url = 'http://localhost:8080/services'
            resp = requests.get(url)
            content = json.loads(resp.content)
            for service in content["services"]:
                ServiceAppointment.objects.update_or_create(
                    import_href=service["href"],
                    defaults={
                        "vehicle_vin": service["vehicle_vin"],
                        "appointment_datetime": service["appointment_datetime"],
                        "appointment_reason": service["appointment_reason"],
                        "customer_name": service["customer_name"],
                        "assigned_technician": service["assigned_technician"],
                    },
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
