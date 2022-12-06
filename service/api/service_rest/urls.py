from django.urls import path

from .views import (
    list_appointments,
    create_technician,
)

urlpatterns = [
    path(
        "services/",
        list_appointments,
        name="list_appointments",
    ),
]
