import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import ServiceAppointment


def appointment_poller():
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
                "technician": service["technician"],
            },
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            appointment_poller(),
            # customer_poller()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)

if __name__ == "__main__":
    poll()
