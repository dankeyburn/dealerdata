from django.urls import path

from .views import (
    list_appointments,
    create_appointment,
    list_technicians,
    create_technician,
    show_technician,
)

urlpatterns = [
    path(
        "services/",
        list_appointments,
        name="list_appointments",
    ),
    path(
        "services/<int:pk>/",
        list_appointments,
        name="list_appointments",
    ),
    path(
        "services/create/",
        create_appointment,
        name="create_appointment",
    ),
    path(
        "technicians/",
        list_technicians,
        name="list_technicians",
    ),
    path(
        "technicians/create/",
        create_technician,
        name="create_technician",
    ),
    path(
        "technicians/<int:pk>",
        show_technician,
        name="show_technician",
    ),

]
